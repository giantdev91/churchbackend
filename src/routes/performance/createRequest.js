import createRequest from '~/db/performance/createRequest';

/**
 * Creates a performance request
 * @path {POST} /request
 * @params {string} postId - ID of the post to comment on
 * @params {string} content - The content of the comment
 */
async function createRequestPost(req, res) {
	const { requestedByUserId, requestedForUserId, description } = req.body;

	const id = await createRequest({
		requestedByUserId,
		requestedForUserId,
		description,
	});

	await res.json(id);
}

export default createRequestPost;
