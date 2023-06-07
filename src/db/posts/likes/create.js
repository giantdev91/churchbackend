import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Like a certain post
 * @param {string} userId The id of the user who liked the post.
 * @param {string} postId The id of the post which the user liked.
 * @returns {void}
 */
async function likePost({ userId, postId }) {
	validateIds(userId, postId);
	await db.query({
		text: `insert into post_like (user_id, post_id)
      values($1, $2);
 `,
		values: [userId, postId],
	});
}

export default likePost;
