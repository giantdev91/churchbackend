import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Deletes a post.
 * @param {string} postId The id of the post to delete.
 * @returns {void}
 */
function deletePost({ postId }) {
	validateIds(postId);
	return db.query({
		text: `delete from post where id = $1`,
		values: [postId],
	});
}

export default deletePost;
