import searchUserFollowers from '~/db/users/follow/searchFollowers';

/**
 * Search for a user in actor's followers
 * @path {GET} /users/followers
 * @query {string} query - Username to search for
 * @query {number} limit - Maximum number of users to retrieve
 * @query {number} skip - Numbers of results to skip (used for
 * pagination)
 * @response {BaseUser[]} users - List of users
 */
async function searchUserFollowersRH(req, res) {
	const { query, limit, skip, id } = req.query;

	const rows = await searchUserFollowers({
		userId: id,
		query,
		limit,
		skip,
	});

	await res.json(rows);
}

export default searchUserFollowersRH;
