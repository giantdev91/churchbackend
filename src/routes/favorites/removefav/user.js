import deleteFavUser from '~/db/favorites/deletefav/user';

/**
 * delete a favorite user for a user
 * @path {DELETE} /favorites/delfavorite/user
 * @params {string} userId - The ID of the user
 * @params {string} userFavId - The ID user unfavorited by user
 */

async function delFavUser(req, res) {
	await deleteFavUser({
		userId: req.body.userId,
		userFavId: req.body.userFavId,
	});

	await res.sendStatus(200);
}
export default delFavUser;
