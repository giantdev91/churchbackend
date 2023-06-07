import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Gets the id of the user who posted a certain comment
 * @param {string} commentId The id of the comment for which you would like to
 * retrieve the user who posted it.
 * @returns {Promise<string>} Returns the id of the user who posted the comment
 */
async function getCommenterId(commentId) {
	validateIds(commentId);
	const {
		rows: [{ user_id: userId }],
	} = await db.query({
		text: `select user_id
		from music_comment
		where id = $1;
`,
		values: [commentId],
	});
	return userId;
}

export default getCommenterId;
