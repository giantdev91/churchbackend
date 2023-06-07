import searchVerified from '~/db/music/searchVerified';

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
async function searchVerifiedRH(req, res) {
	const { limit, skip } = req.query;
	await res.json(
		await searchVerified({ limit, skip, userId: req.user.id })
	);
}

export default searchVerifiedRH;