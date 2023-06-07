import updateSubscribed from '~/db/paywall/update';

/**
 * subscribed the user to another user on muqo end not stripe end
 * @path {PATCH} /paywall
 */
async function updateSubscribedRH(req, res) {
	const {actorId, userId} = req.body;
	await updateSubscribed({ userId, actorId});
	await res.sendStatus(200);
	
}

export default updateSubscribedRH;
