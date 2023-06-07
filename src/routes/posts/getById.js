import getPostById from '~/db/posts/getPostById';

/**
 * Get the information of post based on its id
 * @path {GET} /posts/:postId
 * @params {string} postId - The ID of the post
 * @response {PostResult} - Information about the post
 */
async function getPostByIdRH(req, res) {
	const { postId } = req.params;
	const post = await getPostById(postId);
	await res.json(post);
}

export default getPostByIdRH;
