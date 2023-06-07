// import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Retrieves a user's count of how many times their referral code has been used
 * @param {string} userId The id of the user whose referral code count you would
 * like to retrieve.
 * @returns {Promise<string>} The user's username.
 */
async function getReferralCount({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select code_used
		from referrals
		where id = $1
`,
		values: [userId],
	});
	const queryResults = rows;
	return queryResults[0].code_used;
}

export default getReferralCount;
