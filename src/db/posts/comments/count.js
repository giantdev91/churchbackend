import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Counting the amount of post comments for a particular post
 * @param postId The id of the post for which you would like to count the
 * amount of comments
 * @returns {Promise<number>} Returns a promise containing the comment count
 * for the specified post
 */
async function countPostComments({ postId }) {
	validateIds(postId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from post_comment
		where post_id = $1;
`,
		values: [postId],
	});
	return Number(count);
}

export default countPostComments;
