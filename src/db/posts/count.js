import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Counts the amount of posts made by a user.
 * @param {string} userId The id of the user.
 * @returns {Promise<number>} The number of posts a user has made.
 */
async function countPosts({ userId }) {
	validateIds(userId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from post
		where user_id = $1;
`,
		values: [userId],
	});
	return Number(count);
}

export default countPosts;
