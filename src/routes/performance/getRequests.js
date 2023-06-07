import GetRequests from '~/db/performance/getRequests';

/**
 * Get performance requests for a user
 * @path {POST} /requests/:userId
 * @params {string} userId - ID of the user
 */
export async function getRequests(req, res) {
	const { status, page, limit } = req.query;
	const requests = await GetRequests(req.user.id, status, page, limit);

	await res.json(requests);
}

export async function getRequestsByRequestedForUserId(req, res) {
	const { status, page, limit } = req.query;
	const requests = await GetRequests(req.params.userId, status, page, limit);

	await res.json(requests);
}
