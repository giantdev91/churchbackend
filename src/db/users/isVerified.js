import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Checks whether or not a user is an verified.
 * @param {string} userId The id of the user for whom you'd like to perform
 * this check.
 * @returns {Promise<boolean>} A boolean representing whether user is an
 * verified or not.
 */
async function isVerified(userId) {
	validateIds(userId);
	const {
		rows: [{ is_verified: isUserVerified }],
	} = await db.query({
		text: `select is_verified
		from app_user
		where id = $1;
`,
		values: [userId],
	});
	return isUserVerified;
}

export default isVerified;