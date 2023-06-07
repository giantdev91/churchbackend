import searchMusic from '~/db/music/search';

/**
 * Search for music
 * @path {GET} /music
 * @query {string} query - The music title to search for
 * @query {string} limit - The max amount of music results to return
 * @query {string} skip - The number of music entries to skip
 * before searching (used for pagination)
 * @param {number?} req.query.artistId - The artist ID to search for
 * @response {Promise<MusicByArtistResult[] | MusicResult[]>} music - The
 * array of music results
 */
async function searchMusicRH(req, res) {
	const { query, limit, skip, artistId } = req.query;
	await res.json(
		await searchMusic({ query, limit, skip, artistId, userId: req.user.id })
	);
}

export default searchMusicRH;
