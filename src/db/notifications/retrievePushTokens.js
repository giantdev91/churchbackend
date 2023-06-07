import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Gets the push tokens associated with a user
 * @param {string} userId The id of the user of whom you wish to retrieve
 * the push token
 * @returns {Promise<string[]>} Returns an array of strings representing all
 * the user's push tokens
 */
async function getPushTokens({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select token
		from push_token
		where user_id = $1
`,
		values: [userId],
	});
	const queryResults = camelcaseKeys(rows);
	const pushTokens = [];
	queryResults.forEach((item) => {
		pushTokens.push(item.token);
	});
	return pushTokens;
}

export default getPushTokens;
