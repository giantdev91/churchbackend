import db from '~/db';
import { validateIds, validatePost } from '~/utils/validation';

/**
 * Updates an existing post.
 * @param {string} postId The id of the post to update.
 * @param {string?} title The new title for the post.
 * @param {string?} description The new description for the post.
 * @returns {void}
 */
function updatePost({ postId, title, description }) {
	validatePost({ title, description });
	validateIds(postId);
	return db.query({
		text: `update post
		set title = coalesce($1, title),
			description = coalesce($2, description)
		where id = $3
`,
		values: [title, description, postId],
	});
}

export default updatePost;
