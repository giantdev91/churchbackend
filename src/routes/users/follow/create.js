import followUser from '~/db/users/follow/create';
import sendNotification from '~/utils/sendNotification';

/**
 * Follow a user
 * @path {POST} /users/follow/:userId
 * @params {string} options.userId - User ID to follow
 */
async function followUserRH(req, res) {
	await followUser({ followerId: req.user.id, followingId: req.params.userId });
	// await sendNotification({
	// 	notifierId: req.user.id,
	// 	notifiedId: req.params.userId,
	// 	type: 'follow',
	// });
	await res.sendStatus(200);
}

export default followUserRH;
