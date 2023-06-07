import getVerified from '~/db/posts/getVerified';

/**
 * Get the information of post based on its id
 * @path {GET} /posts/:postId
 * @params {string} postId - The ID of the post
 * @response {PostResult} - Information about the post
 */
async function getVerifiedRH(req, res) {
    const { actorId, limit, skip } = req.query;
	const post = await getVerified({ actorId, limit, skip });
	await res.json(post);
}

export default getVerifiedRH;