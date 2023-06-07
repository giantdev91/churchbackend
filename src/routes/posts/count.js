import countPosts from '~/db/posts/count';

/**
 * Count the number of posts made by the actor
 * @path {GET} /posts/count
 * @response {{ count: number }} count - Number of posts the user has made
 */
async function countPostsRH(req, res) {
	const count = await countPosts({ userId: req.user.id });
	await res.json({ count });
}

export default countPostsRH;
