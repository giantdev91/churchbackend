import deleteSong from '~/db/music/delete';
import getMusicId from '~/db/music/getMusicId';
import { checkPermissions } from '~/utils/auth';

/**
 * Delete a song
 * @path {DELETE} /music/:musicId
 * @params {string} musicId - The ID of the music to delete
 */
async function deleteSongRH(req, res) {
	// Only people who've uploaded the song can delete the song
	const userId = await getMusicId({ musicId: req.params.musicId });
	await checkPermissions(req.user.id, userId);
	await deleteSong({ musicId: req.params.musicId });
	await res.sendStatus(200);
}

export default deleteSongRH;
