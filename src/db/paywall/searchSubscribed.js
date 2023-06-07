import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Search users from the list of users whom a user is subscribed to
 *
 * @param {string} userId The id of the user who we are checking 
 * their subscribed to list
 * @returns List of users the userId is subscribed to
 */
async function searchUserSubscribed({
	userId,

}) {
	validateIds(userId);

	const { rows } = await db.query({
		text: `SELECT f.id, f.username, f.display_name FROM app_user f 
        INNER JOIN feature_flack d ON f.id = ANY (subscribed_to) 
        WHERE d.id = $1;
`,
		values: [userId],
	});
	return camelcaseKeys(rows);
}

export default searchUserSubscribed;
