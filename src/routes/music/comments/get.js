import getMusicComments from '~/db/music/comments/get';

/**
 * Retrieves a post's comments
 * @path {GET} /music/:musicId/comments
 * @params {string} musicId - The ID of the post
 * @query {number} limit - Maximum number of comments to retrieve
 * @query {number} skip - Number of posts to skip (used for
 * pagination)
 * @response {PostComment[]} comments - List of comments
 */
async function getMusicCommentsRH(req, res) {
	const rows = await getMusicComments({
		musicId: req.params.musicId,
		limit: req.query.limit,
		skip: req.query.skip,
	});

	await res.json(rows);
}

export default getMusicCommentsRH;
