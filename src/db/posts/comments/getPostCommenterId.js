import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Gets the id of the user who posted a certain comment and the post id
 * @param {string} commentId The id of the comment for which you would like to
 * retrieve the user who posted it.
 * @returns {Promise<string>} Returns the id of the user who posted the comment
 */
async function getPostCommenterId(commentId) {
	validateIds(commentId);
	const {
		rows: [{ user_id: userId, post_id: postId }],
	} = await db.query({
		text: `select user_id, post_id
		from post_comment
		where id = $1;
`,
		values: [commentId],
	});
	console.log(postId);
	return { userId, postId };
}

export default getPostCommenterId;
