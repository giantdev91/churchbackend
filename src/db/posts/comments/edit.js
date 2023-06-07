import db from '~/db';
import { validateIds, validatePostComment } from '~/utils/validation';

/**
 * Edit an existing post comment
 * @param {string} commentId - The id of the comment which you would like to
 * edit
 * @param {string} content - The new content for the comment
 * @returns {void}
 */
async function editPostComment({ commentId, content }) {
	validateIds(commentId);
	validatePostComment({ content });
	await db.query({
		text: `update post_comment
		set content = $1
		where id = $2;
`,
		values: [content, commentId],
	});
}

export default editPostComment;
