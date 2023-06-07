import getPosts from '~/db/users/getPosts';

async function getPostsRH(req, res) {
	const { limit, skip } = req.query;
	const { userId } = req.params;
	const rows = await getPosts({ userId, limit, skip });
	await res.json(rows);
}

export default getPostsRH;
