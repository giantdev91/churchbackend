import crypto from 'crypto';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Creates a new refresh token for a userId and inserts it into the database
 * @param {string} options.userId - The id of the user for whom you would like to
 * generate a refresh token
 * @returns {Promise<string>} - Returns a promise containing the generated
 * refresh token.
 */
async function createRefreshToken({ userId }) {
	validateIds(userId);
	const refreshToken = crypto.randomBytes(48).toString('hex');
	await db.query({
		text: `
			insert into refresh_token (user_id, token)
			values ($1, $2);
	  `,
		values: [userId, refreshToken],
	});
	return refreshToken;
}

export default createRefreshToken;
