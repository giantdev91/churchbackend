import updatePerformanceRequestStatus from '~/db/performance/updateRequest';

/**
 * Updates teh status of a performance request
 * @path {POST} /request/:requestId
 * @params {string} is - ID of the performance request
 * @params {string} status - The status to update teh request to
 */
async function updateRequestStatus(req, res) {
	const { status } = req.body;

	await updatePerformanceRequestStatus({
		id: req.params.requestId,
		status,
	});

	await res.sendStatus(200);
}

export default updateRequestStatus;
