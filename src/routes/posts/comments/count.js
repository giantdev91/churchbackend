import countPostComments from '~/db/posts/comments/count';

/**
 * Counts the number of post comments on a specific post
 * @path {GET} /posts/:postId/comments/count
 * @params {string} postId - The ID of the post
 * @response {{ count: number }} count - The number of comments on the post
 */
async function countPostCommentsRH(req, res) {
	const count = await countPostComments({ postId: req.params.postId });
	await res.json({ count });
}

export default countPostCommentsRH;
