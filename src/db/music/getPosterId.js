import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Gets the id of the user who posted a particular music.
 * @param {string} musicId The id of the music.
 * @returns {Promise<string>} The id of the user who posted the specified music.
 */
async function getPosterId({ musicId }) {
	validateIds(musicId);
	const {
		rows: [{ user_id: userId }],
	} = await db.query({
		text: `select user_id from music where id = $1`,
		values: [musicId],
	});
	return userId;
}

export default getPosterId;
