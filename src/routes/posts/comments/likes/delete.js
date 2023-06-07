import unlikeComment from '~/db/posts/comments/likes/delete';

/**
 * Unlike a comment
 * @path {DELETE} /posts/comments/:commentId/likes
 * @params {string} commentId - The ID of the comment
 */
async function unlikeCommentRH(req, res) {
	await unlikeComment({ userId: req.user.id, commentId: req.params.commentId });
	await res.sendStatus(200);
}

export default unlikeCommentRH;
