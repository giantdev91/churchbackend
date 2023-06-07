import verifyCommentLikes from '~/db/posts/comments/likes/verify';

/**
 * Check if the user has liked a comment
 * @path {GET} /posts/comments/:commentId/likes/verify
 * @params {string} commentId - The ID of the comment to check
 * @response {{ isLiked: boolean }} isLiked - Whether or not the comment was
 * liked
 */
async function verifyCommentLikeRH(req, res) {
	const isLiked = await verifyCommentLikes({
		userId: req.user.id,
		commentId: req.params.commentId,
	});
	await res.json({ isLiked });
}

export default verifyCommentLikeRH;
