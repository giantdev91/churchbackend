import { expect } from 'chai';
import ffprobe from 'ffprobe-static';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import createMusic from '~/db/music/create';
import ffmpeg from '~/utils/ffmpeg';

import UploadMusic from '../../utils/musicPosts';

/**
 * Upload music
 * @path {POST} /music
 * @body {string} title - The title of the music
 * @param {string?} req.body.artistName - The name of the music's artist
 * @body {boolean} isUserMusic - Whether or not the music's artist
 * is the user that's uploading it
 */

const unlinkAsync = promisify(fs.unlink);

ffmpeg.setFfprobePath(ffprobe.path);

async function uploadMusicRH(req, res) {
	expect(req.files.music, 'A music file is required.').to.exist;
	const musicFile = req.files.music[0];
	const artworkFile = req.files.artwork && req.files.artwork[0];

	const { title, artistName, isUserMusic, genre } = req.body;
	let { artistId } = req.body;

	// If it's the user's own music, they're the artist
	if (isUserMusic) {
		artistId = req.user.id;
	}

	ffmpeg.ffprobe(musicFile.path, async (err, metadata) => {
		if (err) {
			return res.status(400).json({ error: err });
		}

		const duration = Math.round(metadata.format.duration * 1000);

		const musicId = await createMusic({
			uploaderId: req.user.id,
			artistName,
			artistId,
			title,
			duration,
			genre,
		});

		const musicDestDir = path.join(musicFile.destination, 'music');
		const musicDir = path.join(musicDestDir, `${musicId}.mp3`);
		fs.mkdirSync(musicDestDir, { recursive: true });
		fs.renameSync(musicFile.path, path.join(musicDestDir, `${musicId}.mp3`));

		await UploadMusic(musicDir, 'music', 'mp3', musicId);
		await unlinkAsync(musicDir);

		if (artworkFile) {
			const artworkDestDir = path.join(
				artworkFile.destination,
				'music',
				'artwork'
			);
			const artWorkDir = path.join(artworkDestDir, `${musicId}.jpg`);
			fs.mkdirSync(artworkDestDir, { recursive: true });
			fs.renameSync(
				artworkFile.path,
				path.join(artworkDestDir, `${musicId}.jpg`)
			);
			await UploadMusic(artWorkDir, 'artwork', 'jpg', musicId);
			await unlinkAsync(artWorkDir);
		}

		return res.sendStatus(200);
	});
}

export default uploadMusicRH;
