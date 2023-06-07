import getPostsByHashtag from '~/db/posts/getPostsByHashtag';

// TODO: Needs pagination
/**
 * Search posts by hashtag
 * @path {GET} /posts/search
 * @query {string} query - The hashtag to use for searching
 * @response {string[]} posts - List of post IDs that matched the hashtag
 */
async function searchByHashtagRH(req, res) {
	const { query } = req.query;
	const postIds = await getPostsByHashtag({ hashtag: query });
	await res.json(postIds);
}

export default searchByHashtagRH;
