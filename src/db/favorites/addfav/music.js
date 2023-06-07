import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Inserts the favorite music id which is associated to the user
 * @param {string} userId The id of the user who is favoriting
 * @param {string} musicId The id music which user favorited
 * @returns {void}
 */
async function addFavMusic({ userId, musicId }) {
	validateIds(musicId, userId);

	return db.query(
		`
    insert into favorites (user_id, fav_music_id)
    values ($1, $2)
    `,
		[userId, musicId]
	);
}

export default addFavMusic;
