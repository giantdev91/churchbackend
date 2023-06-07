import countPostLikes from '~/db/posts/likes/count';

/**
 * Count number of likes on a post
 * @path {GET} /posts/:postId/likes/count
 * @params {string} postId - ID of the post
 * @response {{ count: number }} count - The number of likes
 */
async function countPostLikesRH(req, res) {
	const count = await countPostLikes({ postId: req.params.postId });
	await res.json({ count });
}

export default countPostLikesRH;
