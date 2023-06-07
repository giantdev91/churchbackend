import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Get the amount of users a certain user is following.
 * @param {string} userId The id of the user.
 * @returns {Promise<number>} The amonut of users the specified user is
 * following.
 */
async function getUserFollowingCount({ userId }) {
	validateIds(userId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from follow
		where follower_id = $1;
`,
		values: [userId],
	});
	return Number(count);
}

export default getUserFollowingCount;
