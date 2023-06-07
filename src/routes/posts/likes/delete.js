import unlikePost from '~/db/posts/likes/delete';

/**
 * Unlike a post
 * @path {DELETE} /posts/:postId/likes
 * @params {string} postId - The ID of the post to unlike
 */
async function unlikePostRH(req, res) {
	await unlikePost({ userId: req.user.id, postId: req.params.postId });
	await res.sendStatus(200);
}

export default unlikePostRH;
