import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Counts the amount of likes for a given post
 * @param {string} postId The id of the post for which you would like to
 * retrieve the amount of likes
 * @returns {Promise<number>} The amount of likes a certain post has.
 */
async function countPostLikes({ postId }) {
	validateIds(postId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*) from post_like
      where post_id = $1;
 `,
		values: [postId],
	});
	return Number(count);
}

export default countPostLikes;
