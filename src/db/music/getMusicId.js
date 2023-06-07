import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Gets the id of the music who posted a particular post.
 * @param {string} postId The id of the song.
 * @returns {Promise<string>} The id of the user who posted the specified post.
 */
async function getMusicId({ musicId }) {
	validateIds(musicId);
	const {
		rows: [{ uploader_id: userId }],
	} = await db.query({
		text: `select uploader_id from music where id = $1`,
		values: [musicId],
	});
	return userId;
}

export default getMusicId;
