import getUserFollowingCount from '~/db/users/follow/getFollowingCount';

/**
 * Count number of users a user is following
 * @path {GET} /users/:userId/following/count
 * @params {string} options.userId - User ID
 */
async function getUserFollowingCountRH(req, res) {
	const count = await getUserFollowingCount({ userId: req.params.userId });
	await res.json({ count });
}

export default getUserFollowingCountRH;
