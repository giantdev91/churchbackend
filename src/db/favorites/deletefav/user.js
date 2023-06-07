import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Deletes a Favorited user of a another user
 * @param {string} userId The id of user who wishes to unfavorite a user
 * @param {string} userFavId The id user to be unfavorited
 * @returns {void}
 */
async function deleteFavUser({ userId, userFavId }) {
	validateIds(userFavId, userId);

	return db.query(
		`
		delete
		from favorites
		where user_id = $1 AND fav_user_id = $2 ;
    `,
		[userId, userFavId]
	);
}

export default deleteFavUser;
