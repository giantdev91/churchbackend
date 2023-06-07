import verifyPostLikes from '~/db/posts/likes/verify';

/**
 * Check if the user has liked a post
 * @path {GET} /posts/:postId/likes/verify
 * @params {string} postId - The ID of the comment to check
 * @response {{ isLiked: boolean }} isLiked - Whether or not the post was liked
 */
async function verifyPostLikesRH(req, res) {
	const isLiked = await verifyPostLikes({
		userId: req.user.id,
		postId: req.params.postId,
	});
	await res.json({ isLiked });
}

export default verifyPostLikesRH;
