import nodemailer from 'nodemailer';
import pify from 'pify';

import getUserDisplayName from '~/db/users/getUserDisplayName';
import getUsernameFromId from '~/db/users/getUsernameFromId';

async function reportPostRH(req, res) {
	const { reason, description } = req.body;
	const reportedPost = req.params.id;
	console.log('req.params :', req.params);
	const reporterId = req.user.id;
	// const reportedUser = {
	// 	username: await getUsernameFromId({ userId: reportedPost }),
	// 	displayName: await getUserDisplayName({ userId: reportedPost }),
	// };
	const reporterUser = {
		username: await getUsernameFromId({ userId: reporterId }),
		displayName: await getUserDisplayName({ userId: reporterId }),
	};
	const htmlTemplate = `<h1>User Report</h1><br /><p>User Post with ID ${reportedPost} has been reported by ${reporterUser.displayName} (${reporterUser.username}) with user ID ${reporterId}</p><br /><p>Reason: ${reason}</p><br/><p>Description: ${description}</p><p>reportedPost: ${reportedPost}</p>`;
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
			subject: 'Post report',
			html: htmlTemplate,
		})
	);
	await res.status(200).end();
}

export default reportPostRH;
