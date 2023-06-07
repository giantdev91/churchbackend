import countCommentLikes from '~/db/posts/comments/likes/count';

/**
 * Counts the number of likes on a specific post
 * @path {GET} /posts/comments/:commentId/likes/count
 * @params {string} commentId - The ID of the comment
 * @response {{ count: number }} count - The number of comments
 */
async function countCommentLikesRH(req, res) {
	const count = await countCommentLikes({ commentId: req.params.commentId });
	await res.json({ count });
}

export default countCommentLikesRH;
