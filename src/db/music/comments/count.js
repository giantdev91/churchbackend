import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Counting the amount of music comments for a particular music
 * @param musicId The id of the music for which you would like to count the
 * amount of comments
 * @returns {Promise<number>} Returns a promise containing the comment count
 * for the specified music
 */
async function countMusicComments({ musicId }) {
	validateIds(musicId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from music_comment
		where music_id = $1;
`,
		values: [musicId],
	});
	return Number(count);
}

export default countMusicComments;
