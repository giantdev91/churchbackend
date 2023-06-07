import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Like a certain comment
 * @param {string} userId The id of the user who liked the comment.
 * @param {string} commentId The id of the comment which the user liked.
 * @returns {void}
 */
function likeComment({ userId, commentId }) {
	validateIds(userId, commentId);
	return db.query({
		text: `insert into post_comment_like (user_id, comment_id)
      values ($1, $2);
 `,
		values: [userId, commentId],
	});
}

export default likeComment;
