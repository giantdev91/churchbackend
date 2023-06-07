import fs from 'fs';
import sharp from 'sharp';
import { promisify } from 'util';

import UploadAvatar from '../../../utils/avatar';

/**
 * Update the user's avatar
 * @path {POST} /users/avatar
 * @response {{ url: string }} url - The URL of the new avatar
 */

const unlinkAsync = promisify(fs.unlink);

async function updateUserWallPhotoRH(req, res) {
	const file = await sharp(req.file.path).resize(200).toBuffer();

	const response = await UploadAvatar(file, 'covers', req.user.id); // buffer, type, and user id

	await unlinkAsync(req.file.path);

	res.status(200).json({ url: response.Location });
}

export default updateUserWallPhotoRH;
