import searchfavmusic from '~/db/favorites/searchfav/music';

/**
 * Get favorite music of user
 * @path {GET} /favorites/getfavorite/music:userId
 * @params {string} userId - The ID of the user
 * @query {number} limit - Maximum number of music get
 * @response {string[]} favMusic - List favmusic ids
 */

async function getFavMusicByUserId(req, res) {
	const rows = await searchfavmusic({
		userId: req.params.userId,
		// limit: req.query.limit,
	});

	await res.json(rows);
}
export default getFavMusicByUserId;
