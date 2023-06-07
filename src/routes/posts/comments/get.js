import getPostComments from '~/db/posts/comments/get';

/**
 * Retrieves a post's comments
 * @path {GET} /posts/:postId/comments
 * @params {string} postId - The ID of the post
 * @query {number} limit - Maximum number of comments to retrieve
 * @query {number} skip - Number of posts to skip (used for
 * pagination)
 * @response {PostComment[]} comments - List of comments
 */
async function getPostCommentsRH(req, res) {
	const rows = await getPostComments({
		postId: req.params.postId,
		limit: req.query.limit,
		skip: req.query.skip,
	});

	await res.json(rows);
}

export default getPostCommentsRH;
