import searchVerified from '~/db/users/searchVerified'

// Retrieve users (based on a search parameter)
async function searchVerifiedRH(req, res) {
	const { actorId, limit, skip } = req.query;
	await res.json(await searchVerified({ actorId, limit, skip }));
}

export default searchVerifiedRH;
