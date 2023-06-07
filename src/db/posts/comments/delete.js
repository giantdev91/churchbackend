import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Deletes a post comment
 * @param {string} commentId The id of the comment which you would like to
 * delete
 * @returns {void}
 */
function deletePostComment({ commentId }) {
	validateIds(commentId);
	return db.query({
		text: `delete
		from post_comment
		where id = $1;
`,
		values: [commentId],
	});
}

export default deletePostComment;
