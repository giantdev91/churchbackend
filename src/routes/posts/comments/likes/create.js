import getPostCommenterId from '~/db/posts/comments/getPostCommenterId';
import likeComment from '~/db/posts/comments/likes/create';
import sendNotification from '~/utils/sendNotification';
/**
 * Likes a comment
 * @path {POST} /posts/comments/:commentId/likes
 * @params {string} commentId - The ID of the comment to like
 */
async function likeCommentRH(req, res) {
	const { userId, postId } = await getPostCommenterId(req.params.commentId);

	if (userId !== req.user.id) {
		await sendNotification({
			notifierId: req.user.id,
			notifiedId: userId,
			postId,
			type: 'like-comment',
		});
	}

	await likeComment({ userId: req.user.id, commentId: req.params.commentId });
	await res.sendStatus(200);
}

export default likeCommentRH;
