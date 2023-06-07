import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Unlikes a post.
 * @param {string} userId The id of the user who unliked a post.
 * @param {string} postId The id of the post which the user unliked.
 * @returns {void}
 */
async function unlikePost({ userId, postId }) {
	validateIds(userId, postId);
	await db.query({
		text: `delete from post_like
    where user_id = $1 and post_id = $2
 `,
		values: [userId, postId],
	});
}

export default unlikePost;
