import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Retrieves a user's display name.
 * @param {string} userId The id of the user whose display name you would
 * like to retrieve.
 * @returns {Promise<string>} The user's display name.
 */
async function getUserDisplayName({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select display_name
		from app_user
		where id = $1
`,
		values: [userId],
	});
	const queryResults = camelcaseKeys(rows);
	return queryResults[0].displayName;
}

export default getUserDisplayName;
