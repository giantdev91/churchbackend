import nodemailer from 'nodemailer';
import pify from 'pify';

import getUserDisplayName from '~/db/users/getUserDisplayName';
import getUsernameFromId from '~/db/users/getUsernameFromId';

/**
 * Reports music with a specific ID
 * @path {POST} /users/reportMusic/:musicId
 * @params {string} musicId - The ID of the music that is being reported
 */

async function reportMusicRH(req, res) {
	const { reason, description } = req.body;
	const reportedMusic = req.params.id;
	console.log('req.params: ', req.params);
	console.log('req.params.id: ', req.params.id);

	const reporterId = req.user.id;
	console.log('reporterId: ', reporterId);

	const reporterUser = {
		username: await getUsernameFromId({ userId: reporterId }),
		displayName: await getUserDisplayName({ userId: reporterId }),
	};
	console.log('reportedUser: ', reporterUser);

	const htmlTemplate = `<h1>Music Report</h1><br /><p>User Music with ID ${reportedMusic} has been reported by ${reporterUser.displayName} (${reporterUser.username}) with user ID ${reporterId}</p><br /><p>Reason: ${reason}</p><br/><p>Description: ${description}</p><p>reportedMusic: ${reportedMusic}</p>`;
	console.log('htmlTemplate: ', htmlTemplate);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'muqotest@gmail.com',
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	console.log('transporter: ', transporter);

	await pify(
		transporter.sendMail({
			from: 'muqotest@gmail.com',
			to: 'muqotest@gmail.com',
			subject: 'Music report',
			html: htmlTemplate,
		})
	);

	await res.status(200).end();
}

export default reportMusicRH;
