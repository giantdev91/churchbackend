import deleteFavMusic from '~/db/favorites/deletefav/music';

/**
 * delete a favorite music for a user
 * @path {DELETE} /favorites/delfavorite/music
 * @params {string} userId - The ID of the user
 * @params {string} musicId - The ID music unfavorited by user
 */

async function delFavMusic(req, res) {
	await deleteFavMusic({
		userId: req.user.id,
		musicId: req.params.musicId,
	});

	await res.sendStatus(200);
}
export default delFavMusic;
