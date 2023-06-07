import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Inserts the favorite user id which is associated to the user
 * @param {string} userId The id of the user who is favoriting
 * @param {string} userFavId The id user which user favorited
 * @returns {void}
 */
async function addFavUser({ userId, userFavId }) {
	validateIds(userFavId, userId);

	return db.query(
		`
    insert into favorites (user_id, fav_user_id)
    values ($1, $2)
    `,
		[userId, userFavId]
	);
}

export default addFavUser;
