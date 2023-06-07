import searchFavUser from '~/db/favorites/searchfav/user';

/**
 * Get favorite users of user
 * @path {GET} /favorites/getfavorite/user:userId
 * @params {string} userId - The ID of the user
 * @query {number} limit - Maximum number of users get
 * @response {string[]} favUser - List favUser ids
 */

async function getFavUser(req, res) {
	const rows = await searchFavUser({
		userId: req.params.userId,
		limit: req.query.limit,
	});

	await res.json(rows);
}
export default getFavUser;
