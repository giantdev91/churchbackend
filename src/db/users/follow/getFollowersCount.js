import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Get the amount of followers a certain user hass.
 * @param {string} userId The id of the user for who you wish to count the
 * amount of followers they have.
 * @returns {Promise<number>} The amount of followers the specified user has.
 */
async function getUserFollowersCount({ userId }) {
	validateIds(userId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from follow
		where following_id = $1;
`,
		values: [userId],
	});
	return Number(count);
}

export default getUserFollowersCount;
