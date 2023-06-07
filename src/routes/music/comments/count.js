import countMusicComments from '~/db/music/comments/count';

/**
 * Counts the number of music comments on a specific music
 * @path {GET} /musics/:musicId/comments/count
 * @params {string} musicId - The ID of the music
 * @response {{ count: number }} count - The number of comments on the music
 */
async function countMusicCommentsRH(req, res) {
	const count = await countMusicComments({ musicId: req.params.musicId });
	await res.json({ count });
}

export default countMusicCommentsRH;
