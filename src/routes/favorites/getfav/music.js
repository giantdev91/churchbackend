import searchfavmusic from '~/db/favorites/searchfav/music';

/**
 * Get favorite music of user
 * @path {GET} /favorites/getfavorite/music:userId
 * @params {string} userId - The ID of the user
 * @query {number} limit - Maximum number of music get
 * @response {string[]} favMusic - List favmusic ids
 */

async function getFavMusic(req, res) {
	const rows = await searchfavmusic({
		userId: req.user.id,
		// limit: req.query.limit,
	});

	await res.json(rows);
}
export default getFavMusic;
