import getPostLikes from '~/db/posts/likes/get';

/**
 * Get the users who've liked a post
 * @path {GET} /posts/:postId/likes
 * @params {string} postId - The ID of the post
 * @query {number} limit - The maximum number of posts to retrieve
 * @query {number} skip - The number of posts to skip before
 * searching (used for pagination)
 * @response {PostResult[]} post - List of posts
 */
async function getPostLikesRH(req, res) {
	const { limit, skip } = req.query;
	const rows = await getPostLikes({
		postId: req.params.postId,
		limit,
		skip,
	});
	await res.json(rows);
}

export default getPostLikesRH;
