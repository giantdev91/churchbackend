import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Unlikes a comment.
 * @param {string} userId The id of the user who unliked a comment.
 * @param {string} commentId The id of the comment which the user unliked.
 * @returns {void}
 */
function unlikeComment({ userId, commentId }) {
	validateIds(userId, commentId);
	return db.query({
		text: `delete from post_comment_like
    where user_id = $1 and comment_id = $2
 `,
		values: [userId, commentId],
	});
}

export default unlikeComment;
