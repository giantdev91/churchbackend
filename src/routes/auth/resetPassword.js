import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import pify from 'pify';

import db from '~/db';

const transporter = nodemailer.createTransport({
	host: 'debugmail.io',
	port: 25,
	secure: false,
	auth: {
		user: 'leonzalion@gmail.com',
		pass: process.env.DEBUGMAIL_PASSWORD,
	},
});

/**
 * Send a reset password request to a user's email
 * @path {POST} /auth/reset-password
 * @body {string} username - The username of the user
 * @body {string} email - The email of the user
 */
async function resetPasswordRH(req, res) {
	const credentialType = req.body.username ? 'username' : 'email';

	function emailSentNotice() {
		res.json({
			message: `A reset password link has been sent to the ${
				credentialType === 'username' ? 'associated email' : 'email'
			}, if there is an account associated with it.`,
		});
	}

	const { rows } = await db.query({
		text: `select id, email from app_user where $1 = $2;
 `,
		values: [credentialType, req.body[credentialType]],
	});

	if (rows.length === 0) {
		return emailSentNotice();
	}

	const { id: userId, email: userEmail } = rows[0];

	// Check if there have been >5 previous attempts, and if so, deny the request
	const {
		rows: [{ count: resetAttemptsCount }],
	} = await db.query({
		text: `select count(*) from password_reset_request where user_id = $1;
 `,
		values: [userId],
	});

	if (resetAttemptsCount > 5) {
		return res.status(401).json({
			message: 'Too many password reset attempts. Please try again later.',
		});
	}

	// TODO: Send reset password email to client with the following id:
	const resetRequestId = crypto.randomBytes(48).toString('hex');

	const hashedResetRequestId = bcrypt.hashSync(resetRequestId, '');
	await db.query({
		text: `
			insert into password_reset_request (id_hash, user_id)
			values ($1, $2);
		`,
		values: [hashedResetRequestId, userId],
	});

	const result = await pify(
		transporter.sendMail({
			from: 'leonzalion@gmail.com',
			to: 'leonzalion@gmail.com' || userEmail,
			subject: 'Testing',
			text: 'Meow',
		})
	);
	console.warn(result);

	return emailSentNotice();
}

export default resetPasswordRH;
