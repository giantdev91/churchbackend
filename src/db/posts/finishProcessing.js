import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Marks the post as having finished processing.
 * @param {string} postId The id of the post to mark.
 * @returns {void}
 */
function finishProcessingPost({ postId }) {
	validateIds(postId);
	return db.query({
		text: `update post set is_processing = false where id = $1`,
		values: [postId],
	});
}

export default finishProcessingPost;
