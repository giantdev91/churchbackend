import getPosterId from '~/db/posts/getPosterId';
import likePost from '~/db/posts/likes/create';
import sendNotification from '~/utils/sendNotification';

/**
 * Like a post
 * @path {POST} /posts/:postId/likes
 * @params {string} postId - The ID of the post to like
 */
async function likePostRH(req, res) {
	const posterId = await getPosterId({ postId: req.params.postId });
	if (posterId !== req.user.id) {
		await sendNotification({
			notifierId: req.user.id,
			notifiedId: posterId,
			postId: req.params.postId,
			type: 'like-post',
		});
	}
	await likePost({ userId: req.user.id, postId: req.params.postId });
	await res.sendStatus(200);
}

export default likePostRH;
