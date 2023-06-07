import getUserFollowersCount from '~/db/users/follow/getFollowersCount';

/**
 * Count number of followers a user has
 * @path {GET} /users/:userId/followers/count
 * @params {string} options.userId - User ID
 */
async function getUserFollowersCountRH(req, res) {
	const count = await getUserFollowersCount({ userId: req.params.userId });
	await res.json({ count });
}

export default getUserFollowersCountRH;
