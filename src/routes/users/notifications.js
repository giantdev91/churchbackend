import getNotifications from '~/db/users/notifications';

async function getNotificationsRH(req, res) {
	const { type, limit } = req.query;
	const notifications = await getNotifications({
		notifiedId: req.user.id,
		type,
		limit,
	});
	await res.json(notifications);
}

export default getNotificationsRH;
