import getPostsPrivate from '~/db/users/getPostsPrivate';

async function getPostsPrivateRH(req, res) {
	const { limit, skip } = req.query;
	const { userId } = req.params;
	const rows = await getPostsPrivate({ userId, limit, skip });
	await res.json(rows);
}

export default getPostsPrivateRH;
