import unfollowUser from '~/db/users/follow/delete';

/**
 * Unfollow a user
 * @path {POST} /users/unfollow/:userId
 * @params {string} options.userId - User ID to unfollow
 */
async function unfollowUserRH(req, res) {
	await unfollowUser({
		followerId: req.user.id,
		followingId: req.params.userId,
	});
	await res.sendStatus(200);
}

export default unfollowUserRH;
