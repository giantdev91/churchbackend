import createMusicComment from '~/db/music/comments/create';
// import getPosterId from '~/db/music/getPosterId';
// import sendNotification from '~/utils/sendNotification';

/**
 * Creates a comment on a specific post
 * @path {POST} /music/:musicId/comments
 * @params {string} musicId - ID of the post to comment on
 * @params {string} content - The content of the comment
 */
async function createMusicCommentRH(req, res) {
	const { content } = req.body;
	// const posterId = await getPosterId({ musicId: req.params.musicId });

	// if (posterId !== req.user.id) {
	// 	await sendNotification({
	// 		notifierId: req.user.id,
	// 		notifiedId: posterId,
	// 		musicId: req.params.musicId,
	// 		type: 'comment',
	// 	});
	// }

	await createMusicComment({
		userId: req.user.id,
		musicId: req.params.musicId,
		content,
	});
	await res.sendStatus(200);
}

export default createMusicCommentRH;
