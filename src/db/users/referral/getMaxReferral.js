
import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Retrieves a user's max amount of referrals they can send out
 * @param {string} userId The id of the user whose  max referral 
 * code count you would like to retrieve.
 * @returns {Promise<string>} The user's username.
 */
async function getMaxReferral({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select max
		from referrals
		where id = $1
`,
		values: [userId],
	});
	const queryResults = rows;
	return queryResults[0].max;
}

export default getMaxReferral;
