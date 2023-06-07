import searchUserFollowing from '~/db/users/follow/searchFollowing';

/**
 * Search for a user from the users that the actor's is following
 * @path {GET} /users/following
 * @query {string} query - Username to search for
 * @query {number} limit - Maximum number of users to retrieve
 * @query {number} skip - Numbers of results to skip (used for
 * pagination)
 * @response {BaseUser[]} users - List of users
 */
async function searchUserFollowingRH(req, res) {
	const { query, limit, skip, id } = req.query;

	const rows = await searchUserFollowing({
		userId: id,
		query,
		limit,
		skip,
	});

	await res.json(rows);
}

export default searchUserFollowingRH;
