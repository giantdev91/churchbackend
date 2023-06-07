import isUserSubscribed from '~/db/auth/isUserSubscribed';

/**
 * Checks if a username is available
 * @path {GET} /auth/is-username-available
 * @query {string} username - The username to check
 * @response {boolean} isAvailable - Whether or not the username is available
 */
async function checkIsUserSubscribedRH(req, res) {
	await res.json(await isUserSubscribed({ userId: req.query.userId, actorId: req.query.actorId}));
}

export default checkIsUserSubscribedRH;
