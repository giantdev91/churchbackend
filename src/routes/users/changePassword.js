import bcrypt from 'bcryptjs';

import db from '~/db';

async function changePassword(req, res) {
	const { currentPassword, newPassword, refreshToken } = req.body;
	const userId = req.user.id;

	const {
		rows: [{ password_hash: oldPasswordHash }],
	} = await db.query({
		text: `select password_hash
					 from app_user
					 where id = $1;`,
		values: [userId],
	});

	if (!(await bcrypt.compare(currentPassword, oldPasswordHash))) {
		return res.status(401).end({ error: 'Current password is incorrect.' });
	}

	const passwordHash = bcrypt.hashSync(newPassword, 10);
	// Expire all refresh tokens associated with user
	await db.query({
		text: `delete
					 from refresh_token
					 where user_id = $1
						 and token != $2;
		`,
		values: [userId, refreshToken],
	});

	await db.query({
		text: `
			update app_user
			set password_hash = $2
			where id = $1;
		`,
		values: [userId, passwordHash],
	});

	return res.sendStatus(200);
}

export default changePassword;
