import getFeed from '~/db/users/getFeed';

// Retrieve all posts that were posted by those the user follows
async function getFeedRH(req, res) {
	const { skip, limit } = req.query;
	const feed = await getFeed({ userId: req.user.id, skip, limit });
	await res.json(feed);
}

export default getFeedRH;
