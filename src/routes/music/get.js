import getMusic from '~/db/music/get';

/**
 * Retrieves music with a specific ID
 * @path {GET} /music/:musicId
 * @params {string} musicId - The ID of the music to retrieve
 * @response {Music} music - The music result
 */
async function getMusicRH(req, res) {
	await res.json(await getMusic({ musicId: req.params.musicId }));
}

export default getMusicRH;
