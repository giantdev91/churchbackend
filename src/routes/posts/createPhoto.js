import fs from 'fs';
import sharp from 'sharp';
import { promisify } from 'util';

import createPost from '~/db/posts/create';
import createPhotoPost from '~/utils/photoPosts';
/**
 * Create a photo post
 * @path {POST} /posts/photo
 * @body {string} title - Title of the post
 * @body {string} description - Description of the post
 * @body {string} musicId - The ID of the music used in the post,
 * if any
 * @body {string} categories - The categories the post has been
 * associated with
 */

const unlinkAsync = promisify(fs.unlink);

async function createPhotoPostRH(req, res) {
	const { title, description, musicId, categories: categoriesJSON, genreId } = req.body;
	const categories = JSON.parse(categoriesJSON);
	const postId = await createPost({
		userId: req.user.id,
		description,
		title,
		isPhoto: true,
		musicId,
		categories,
		genreId
	});

	const file = await sharp(req.file.path).toBuffer();

	await createPhotoPost(file, postId); // buffer, type, and user id

	await unlinkAsync(req.file.path);

	await res.sendStatus(200);
}

export default createPhotoPostRH;
