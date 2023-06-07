import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Verifies if a user has liked a certain comment.
 * @param {string} userId The id of the user.
 * @param {string} commentId The id of the comment.
 * @returns {Promise<boolean>} A boolean representing whether or not the
 * specified user has liked the specified comment.
 */
async function verifyCommentLike({ userId, commentId }) {
	validateIds(commentId);

	const { rows } = await db.query({
		text: `select comment_id
		from post_comment_like
		where user_id=$1
		and comment_id=$2;
 `,
		values: [userId, commentId],
	});
	return rows.length >= 1;
}

export default verifyCommentLike;
