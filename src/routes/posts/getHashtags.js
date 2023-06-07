import getPostHashtags from '~/db/posts/hashtags/get';

/**
 * Retrieve the hashtags associated with a post
 * @path {GET} /posts/:postId/hashtags
 * @params {string} postId - The ID of the post
 * @response {string[]} hashtags - List of hashtags
 */
async function getPostHashtagsRH(req, res) {
	await res.json(await getPostHashtags(req.params.postId));
}

export default getPostHashtagsRH;
