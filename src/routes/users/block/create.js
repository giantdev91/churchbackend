import blockUser from '~/db/users/block/create';
import unfollowUser from '~/db/users/follow/delete';

/**
 * Block a user
 * @path {POST} users/block/:userId
 * @params {string} options.userId - The ID of the user to block
 */
async function blockUserRH(req, res) {
	await blockUser({ blockerId: req.user.id, blockedId: req.params.userId });
	await unfollowUser({
		followerId: req.user.id,
		followingId: req.params.userId,
	});
	await unfollowUser({
		followerId: req.params.userId,
		followingId: req.user.id,
	});
	await res.sendStatus(200);
}

export default blockUserRH;
