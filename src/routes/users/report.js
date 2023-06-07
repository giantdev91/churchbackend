import nodemailer from 'nodemailer';
import pify from 'pify';

import getUserDisplayName from '~/db/users/getUserDisplayName';
import getUsernameFromId from '~/db/users/getUsernameFromId';

async function reportUserRH(req, res) {
	const { reason, description } = req.body;
	const reportedId = req.params.userId;
	const reporterId = req.user.id;
	const reportedUser = {
		username: await getUsernameFromId({ userId: reportedId }),
		displayName: await getUserDisplayName({ userId: reportedId }),
	};
	const reporterUser = {
		username: await getUsernameFromId({ userId: reporterId }),
		displayName: await getUserDisplayName({ userId: reporterId }),
	};
	const htmlTemplate = `<h1>User Report</h1><br /><p>User ${reportedUser.displayName} (${reportedUser.username}) with user ID ${reportedId} has been reported by ${reporterUser.displayName} (${reporterUser.username}) with user ID ${reporterId}</p><br /><p>Reason: ${reason}</p><br/><p>Description: ${description}</p>`;
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'muqotest@gmail.com',
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	await pify(
		transporter.sendMail({
			from: 'muqotest@gmail.com',
			to: 'muqotest@gmail.com',
			subject: 'User report',
			html: htmlTemplate,
		})
	);
	await res.status(200).end();
}

export default reportUserRH;
