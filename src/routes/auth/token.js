import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { createAuthTokens } from '~/utils/auth';

/**
 * Refreshes a user's tokens
 * @path {POST} /auth/token
 * @body {string} refreshToken - The user's refresh token
 * @response {object} tokens - The user's new tokens
 * @response {string} tokens.refreshToken - Refresh token
 */
async function refreshTokensRH(req, res) {
	const { refreshToken } = req.body;

	const { rows } = await db.query({
		text: `select user_id from refresh_token where token = $1;`,
		values: [refreshToken],
	});

	if (rows.length === 0) {
		return res.status(403).json({
			message: 'Refresh token not found.',
			code: 'invalid_token',
		});
	}

	const { userId } = camelcaseKeys(rows[0]);
	// 	if (isInvalid) {
	// 		// User used an invalidated token, which means that it was maliciously used
	// 		// Delete all tokens associated with this user
	// 		/* (Temporarily disabled to deal with bug)
	// 		await db.query(`
	// 			delete
	// 			from refresh_token
	// 			where userId = $1;
	//     `, [userId]);
	// 		 */
	// 		// TODO: Fix bug with refresh tokens
	// 		return invalidRefreshToken();
	// 	}
	// 	// Invalidate the current refresh token
	// 	await db.query({
	// 		text: `update refresh_token
	// 		set is_invalid = true
	// 		where token = $1;
	//  `,
	// 		values: [refreshToken],
	// 	});

	// 	const SIXTY_DAYS = 60 * 24 * 60 * 60 * 1000;
	// 	// Check if the refresh token expired
	// 	if (new Date() - new Date(dateCreated) > SIXTY_DAYS) {
	// 		return res.status(401).json({
	// 			code: 'invalid_refresh_token',
	// 			message: 'Refresh token expired.',
	// 		});
	// 	}

	return res.json(await createAuthTokens(userId));
}

export default refreshTokensRH;
