import addFavUserD from '~/db/favorites/addfav/user';

/**
 * Add favorite a user for a user
 * @path {POST} /favorites/addfavorite/user
 * @params {string} userId - The ID of the user
 * @params {string} userFavId - The ID user favorited by user
 */

async function addFavUser(req, res) {
	await addFavUserD({
		userId: req.body.userId,
		userFavId: req.body.userFavId,
	});

	await res.sendStatus(200);
}
export default addFavUser;
