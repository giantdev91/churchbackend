import bcrypt from 'bcryptjs';
import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import registerPushToken from '~/db/notifications/registerPushToken';
import { createAuthTokens } from '~/utils/auth';

/**
 * Logs in an existing user
 * @path {POST} /auth/login
 * @body {string} username - The user's username
 * @body {string} password - The user's password
 * @response {object} tokens - Authorization tokens for the user to
 * send alongside future requests when accessing a route
 * @response {string} tokens.refreshToken - Refresh tkoen
 */
async function loginRH(req, res) {
	const { password } = req.body;

	let credentialType = 'username';
	if (req.body.email) {
		credentialType = 'email'
	} else if (req.body.phone_number) {
		credentialType = 'phone_number'
	}
	// const credentialType = req.body.username ? 'username' : 'email';

	if (!req.body[credentialType]) {
		return res.status(400).json({
			message: 'An email, username, or phone number is required.',
		});
	}

	if (!password) {
		return res.status(400).json({
			message: 'A password is required.',
		});
	}

	function invalidCredentials() {
		res.status(403).json({
			message: `Incorrect ${credentialType} or password.`,
		});
	}

	const { rows } = await db.query({
		text: `select password_hash, id from app_user where ${credentialType} = $1;
 `,
		values: [req.body[credentialType]],
	});

	if (rows.length === 0) {
		return invalidCredentials();
	}

	const { passwordHash, id: userId } = camelcaseKeys(rows[0]);
	if (!bcrypt.compareSync(password, passwordHash)) {
		return invalidCredentials();
	}

	registerPushToken({ userId, pushToken: req.body.pushToken });

	return res.json(await createAuthTokens(userId));
}

export default loginRH;
