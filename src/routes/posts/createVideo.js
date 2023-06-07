import { expect } from 'chai';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import pathToFfmpeg from 'ffmpeg-static';
import fs from 'fs';
import { nanoid } from 'nanoid/non-secure';
import parseMilliseconds from 'parse-ms';
import path from 'path';
import { parseArgsStringToArgv } from 'string-argv';

import createPost from '~/db/posts/create';
import finishProcessingPost from '~/db/posts/finishProcessing';
import ffmpeg from '~/utils/ffmpeg';
// import uploadFile2 from '~/utils/upload2';
import uploadFile2 from '~/utils/upload';

dotenv.config({ silent: true });

const pkgDir = require('pkg-dir');
const genThumbnail = require('simple-thumbnail');
const tmp = require('tmp');

/**
 * Upload a post with video
 * @path {POST} /posts/video
 * @body {string} title - The title of the post
 * @body {string} description - The description of the post
 * @body {string} musicId - The ID of the music that the post
 * used, if applicable
 * @body {string} timeframe - The timeframe of the music that the
 * post used, if any
 * @body {string} categories - The categories that the post is
 * associated with
 * @body {string} musicVolume - The volume of the music, from 0
 * (no volume) to 1 (full volume)
 * @body {string} videoVolume - The volume of the video, from 0
 * (no volume) to 1 (full volume)
 */

const thumbVideoUpload = async (destFile, destDir, postId, res) => {
	const rootDir = await pkgDir(__dirname);
	const destThumDir = path.join(
		rootDir,
		'public',
		'uploads',
		'posts',
		'thumbnail'
	);
	fs.mkdirSync(destThumDir, { recursive: true });
	const destDirThumb = path.join(destDir, `thumb${postId}.png`);

	await genThumbnail(destFile, destDirThumb, '150x?', {
		path: pathToFfmpeg,
	}).catch((err) => {
		console.log('Error from ferro', err);
		res.send(err);
	});

	// Upload S3
	await uploadFile2(destFile, `public/uploads/posts/videos/${postId}.mp4`);
	await uploadFile2(
		destDirThumb,
		`public/uploads/posts/thumbnails/thumb${postId}.png`
	);

	// DeleteFiles
	fs.unlinkSync(destFile);
	fs.unlinkSync(destDirThumb);

	await res.sendStatus(200);
};

async function createVideoPostRH(req, res) {
	const {
		title,
		description,
		isPrivate, // new boolean that makes a post private if checked off
		musicId,
		userId: reqUserId,
		postType,
		timeframe: timeframeJSON,
		categories: categoriesJSON,
		musicVolume: musicVolumeStr,
		videoVolume: videoVolumeStr,
		genreId
	} = req.body;

	const categories = JSON.parse(categoriesJSON);
	const { start: timeframeStartStr, end: timeframeEndStr } = JSON.parse(
		timeframeJSON
	);
	const timeframeStart = Number(timeframeStartStr);
	const timeframeEnd = Number(timeframeEndStr);
	const musicDurationInSeconds = Number(timeframeEnd - timeframeStart) * 1000;
	const { milliseconds, seconds, minutes } = parseMilliseconds(timeframeStart);
	const musicVolume = Number(musicVolumeStr);
	const videoVolume = Number(videoVolumeStr);
	expect(musicVolume, 'Music volume must be a number from 0 to 1')
		.to.be.at.least(0)
		.and.at.most(1);
	expect(videoVolume, 'Video volume must be a number from 0 to 1')
		.to.be.at.least(0)
		.and.at.most(1);

	const userId = reqUserId || req.user.id;

	const postId = await createPost({
		userId,
		description,
		title,
		isPhoto: false,
		musicId,
		categories,
		isPrivate,
		postType,
		genreId
	});
	const destDir = path.join(req.file.destination, 'posts', 'videos');
	fs.mkdirSync(destDir, { recursive: true });
	const destFile = path.join(destDir, `${postId}.mp4`);

	const tmpobj = tmp.fileSync();
	console.log('File: ', tmpobj.name);
	console.log('Filedescriptor: ', tmpobj.fd);

	if (musicId) {
		const musicFile = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/public/uploads/music/${musicId}.mp3`;

		const tempMusicFile = path.join(req.file.destination, `${nanoid()}.mp3`);
		const tempVideoFile = path.join(req.file.destination, `${nanoid()}.mp4`);
		await Promise.all([
			new Promise((resolve, reject) => {
				ffmpeg(musicFile)
					.audioFilters(`volume=${musicVolume}`)
					.on('progress', (progress) =>
						console.log('Progress of temp audio: ', progress)
					)
					.on('end', resolve)
					.on('error', reject)
					.saveToFile(tempMusicFile);
			}),
			new Promise((resolve, reject) => {
				ffmpeg(req.file.path)
					.audioFilters(`volume=${videoVolume}`)
					.on('progress', (progress) =>
						console.log('Progress of temp video: ', progress)
					)
					.on('end', resolve)
					.on('error', reject)
					.saveToFile(tempVideoFile);
			}),
		]);
		const commandArgs = parseArgsStringToArgv(`
			${pathToFfmpeg} -i ${tempVideoFile} -ss 00:${minutes}:${seconds}.${milliseconds} -t ${musicDurationInSeconds}
			-i ${tempMusicFile} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest ${destFile}
		`);
		const ffmpegExec = spawn(pathToFfmpeg, commandArgs.slice(1));
		ffmpegExec.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		ffmpegExec.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
		});

		ffmpegExec.on('close', async (code) => {
			if (code === 0) {
				thumbVideoUpload(destFile, destDir, postId, res);
				fs.unlinkSync(tempMusicFile);
				fs.unlinkSync(tempVideoFile);
				fs.unlinkSync(req.file.path);
				await finishProcessingPost({ postId });
			} else {
				console.error('Something went wrong while processing video.');
			}
		});
	} else {
		fs.renameSync(req.file.path, destFile);
		thumbVideoUpload(destFile, destDir, postId, res);
		await finishProcessingPost({ postId });
	}

	// Generate Thumb
}

export default createVideoPostRH;
