import byUser from '~/db/music/byUser';

/**
 * get user uploaded music
 * @path {GET} /music/user
 * @query {string} query - The music title to search for
 * @query {string} limit - The max amount of music results to return
 * @query {string} skip - The number of music entries to skip
 * before searching (used for pagination)
 * @param {number?} req.query.artistId - The artist ID to search for
 * @response {Promise<MusicByArtistResult[] | MusicResult[]>} music - The
 * array of music results
 */
async function byUserIdRH(req, res) {
	await res.json(await byUser({ userId: req.params.userId }));
}

export default byUserIdRH;
