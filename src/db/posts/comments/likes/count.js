import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Counts the amount of comments for a given post
 * @param {string} commentId The id of the comment for which you would like to
 * retrieve the amount of likes
 * @returns {Promise<number>} The amount of likes a certain comment has.
 */
async function countCommentLikes({ commentId }) {
	validateIds(commentId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*) from post_comment_like
      where comment_id = $1;
 `,
		values: [commentId],
	});
	return Number(count);
}

export default countCommentLikes;
