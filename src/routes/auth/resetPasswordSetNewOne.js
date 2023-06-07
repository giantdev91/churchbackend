import bcrypt from 'bcryptjs';
import camelcaseKeys from 'camelcase-keys';

import db from '~/db';

/**
 * Set a new password for a user
 * @path {POST} /auth/reset-password-set-new-one
 * @body {string} id - The ID of the reset password request
 * @body {string} newPassword - The new password to reset to
 */
async function setNewPasswordRH(req, res) {
	function invalidRequestId() {
		res.status(403).json({
			message: 'Invalid request id.',
		});
	}

	const { id, newPassword } = req.body;

	const idHash = bcrypt.hashSync(id, '');

	// Verify the hash with id_hash in the reset_password_request table
	const { rows } = await db.query({
		text: `select
      user_id,
      extract(epoch from current_timestamp - date_created) / 3600 as hours_passed
    from password_reset_request
    where id_hash = $1;
 `,
		values: [idHash],
	});

	if (rows.length === 0) {
		return invalidRequestId();
	}
	const { userId, hoursPassed } = camelcaseKeys(rows[0]);

	if (hoursPassed >= 24) {
		return res.status(403).json({
			message: 'Your password reset id has expired. Please request a new one.',
		});
	}

	const passwordHash = bcrypt.hashSync(newPassword, 10);
	// Expire all refresh tokens associated with user
	await db.query({
		text: `delete from refresh_token where user_id = $1;
		update app_user
		set password_hash = $2
		where id = $1;
 `,
		values: [userId, passwordHash],
	});

	return res.sendStatus(200);
}

export default setNewPasswordRH;
