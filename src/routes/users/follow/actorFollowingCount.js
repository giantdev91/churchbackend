import getUserFollowingCount from '~/db/users/follow/getFollowingCount';

/**
 * Count number of people the actor is following
 * @path {GET} /users/following/count
 * @response {{ count: number }} count - Number of followers
 */
async function getActorFollowingCountRH(req, res) {
	const count = await getUserFollowingCount({ userId: req.user.id });
	await res.json({ count });
}

export default getActorFollowingCountRH;
