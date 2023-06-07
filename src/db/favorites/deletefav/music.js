import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Deletes a Favorited music of a user
 * @param {string} userId The id of user who wishes to unfavorite a music
 * @param {string} musicId The id music to be unfavorited
 * @returns {void}
 */
async function deleteFav({ userId, musicId }) {
	validateIds(musicId, userId);

	return db.query(
		`
		delete
		from favorites
		where user_id = $1 AND fav_music_id = $2 ;
    `,
		[userId, musicId]
	);
}

export default deleteFav;
