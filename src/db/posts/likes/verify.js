import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Verifies if a user has liked a certain post.
 * @param {string} userId The id of the user.
 * @param {string} postId The id of the post.
 * @returns {Promise<boolean>} A boolean representing whether or not the
 * specified user has liked the specified post.
 */
async function verifyPostLike({ userId, postId }) {
	validateIds(postId);

	const { rows } = await db.query({
		text: `select post_id
		from post_like
		where user_id=$1
		and post_id=$2;
 `,
		values: [userId, postId],
	});
	return rows.length >= 1;
}

export default verifyPostLike;
