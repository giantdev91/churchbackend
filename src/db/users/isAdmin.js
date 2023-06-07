import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Checks whether or not a user is an admin.
 * @param {string} userId The id of the user for whom you'd like to perform
 * this check.
 * @returns {Promise<boolean>} A boolean representing whether user is an
 * admin or not.
 */
async function isAdmin(userId) {
	validateIds(userId);
	const {
		rows: [{ is_admin: isUserAdmin }],
	} = await db.query({
		text: `select is_admin
		from app_user
		where id = $1;
`,
		values: [userId],
	});
	return isUserAdmin;
}

export default isAdmin;
