import getPerformancePost from '~/db/performance/getPerformancePost';

async function getPerformancePostRH(req, res) {
	const { limit, skip } = req.query;
	const { userId } = req.params;
	const rows = await getPerformancePost({ userId, limit, skip });
	await res.json(rows);
}

export default getPerformancePostRH;
