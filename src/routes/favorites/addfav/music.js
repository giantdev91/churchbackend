import addFavMusic from '~/db/favorites/addfav/music';

/**
 * Add favorite a music for a user
 * @path {POST} /favorites/addfavorite/music
 * @params {string} userId - The ID of the user
 * @params {string} musicId - The ID music favorited by user
 */

async function addFavMus(req, res) {
	await addFavMusic({
		userId: req.user.id,
		musicId: req.params.musicId,
	});

	await res.sendStatus(200);
}
export default addFavMus;
