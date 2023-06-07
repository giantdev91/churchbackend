import searchUsers from '~/db/users/search';

// Retrieve users (based on a search parameter)
async function searchUsersRH(req, res) {
	const { actorId, limit, skip, query } = req.query;
	await res.json(await searchUsers({ actorId, limit, skip, query }));
}

export default searchUsersRH;
