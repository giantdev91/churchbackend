import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Retrieves a user's username.
 * @param {string} userId The id of the user whose username you would
 * like to retrieve.
 * @returns {Promise<string>} The user's username.
 */
async function getUsernameFromId({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select username
		from app_user
		where id = $1
`,
		values: [userId],
	});
	const queryResults = camelcaseKeys(rows);
	return queryResults[0].username;
}

export default getUsernameFromId;
