import admin from 'firebase-admin';

import registerNotification from '~/db/notifications/register';
import getPushTokens from '~/db/notifications/retrievePushTokens';
import getUserDisplayName from '~/db/users/getUserDisplayName';

export default async ({ notifierId, notifiedId, postId, type }) => {
	const notifierName = await getUserDisplayName({ userId: notifierId });
	const messages = {
		follow: {
			title: `${notifierName} has followed you.`,
			body: '',
		},
		like: {
			title: `${notifierName} has liked your post:`,
			body: 'post name', // TODO: Post name
		},
		post: {
			title: `${notifierName} has created a new post:`,
			body: 'post name', // TODO: Post name
		},
	};
	const pushTokens = await getPushTokens({ userId: notifiedId });
	pushTokens.forEach((item) => {
		admin.messaging()
		.sendToDevice(
			item, 
			{ notification: messages[type] }, 
			{contentAvailable: true,
			priority: 'high'}
		);
	});
	registerNotification({ notifierId, notifiedId, postId, type });
};
