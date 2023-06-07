import createPostComment from '~/db/posts/comments/create';
import getPosterId from '~/db/posts/getPosterId';
import sendNotification from '~/utils/sendNotification';

/**
 * Creates a comment on a specific post
 * @path {POST} /posts/:postId/comments
 * @params {string} postId - ID of the post to comment on
 * @params {string} content - The content of the comment
 */
async function createPostCommentRH(req, res) {
	const { content } = req.body;
	const posterId = await getPosterId({ postId: req.params.postId });

	if (posterId !== req.user.id) {
		await sendNotification({
			notifierId: req.user.id,
			notifiedId: posterId,
			postId: req.params.postId,
			type: 'comment',
		});
	}

	await createPostComment({
		userId: req.user.id,
		postId: req.params.postId,
		content,
	});
	await res.sendStatus(200);
}

export default createPostCommentRH;
