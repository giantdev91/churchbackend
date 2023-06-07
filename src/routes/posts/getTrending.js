import getTrending from '~/db/posts/getTrending';

/**
 * Get the trending posts
 * @path {GET} /posts/trending
 * @query {number} limit - Limit of posts to retrieve
 * @query {number} skip - Offset from where to start retrieving
 * results (used for pagination)
 * @query {string?} category - The category of posts to search from (if not
 * provided it searches from all categories)
 * @response {TrendingPost[]} posts - List of trending posts
 */
async function getTrendingPostsRH(req, res) {
	const { actorId, limit, skip, category } = req.query;

	const rows = await getTrending({ actorId, category, limit, skip });
	await res.json(rows);
}

export default getTrendingPostsRH;
