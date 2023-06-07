import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Gets the id of the user who posted a particular post.
 * @param {string} postId The id of the post.
 * @returns {Promise<string>} The id of the user who posted the specified post.
 */
async function getPosterId({ postId }) {
	validateIds(postId);
	const {
		rows: [{ user_id: userId }],
	} = await db.query({
		text: `select user_id from post where id = $1`,
		values: [postId],
	});
	return userId;
}

export default getPosterId;
