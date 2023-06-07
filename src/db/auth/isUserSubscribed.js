
import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Retrieves a user's max amount of referrals they can send out
 * @param {string} userId The id of the user whose  max referral 
 * code count you would like to retrieve.
 * @returns {Promise<string>} The user's username.
 */
async function isUserSubscribed({ userId, actorId }) {

	validateIds(userId);
	validateIds(actorId);
	const { 
		rows: [{ count }], 
	} = await db.query({
		text: `select count(*)
		from feature_flack
		where $1 = any (subscribed_to) and id = $2;
`,
		values: [userId,actorId],
	});
	
	return Number(count) !== 0;
}

export default isUserSubscribed;