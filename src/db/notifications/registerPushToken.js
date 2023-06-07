import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Saves a push token to the database
 * @param {string} userId The id of the user whom the post token is
 * associated with
 * @param {string} pushToken The push token itself (a unique identifier)
 * @returns {void}
 */
function registerPushToken({ userId, pushToken }) {
	validateIds(userId);
	db.query({
		text: `
			insert into push_token (user_id, token)
			values ($1, $2);
		`,
		values: [userId, pushToken],
	});
}

export default registerPushToken;
