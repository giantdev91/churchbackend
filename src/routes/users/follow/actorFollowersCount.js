import getUserFollowersCount from '~/db/users/follow/getFollowersCount';

/**
 * Count number of followers the actor has
 * @path {GET} /users/followers/count
 * @response {{ count: number }} count - Number of followers
 */
async function getActorFollowersCountRH(req, res) {
	const count = await getUserFollowersCount({ userId: req.user.id });
	await res.json({ count });
}

export default getActorFollowersCountRH;
