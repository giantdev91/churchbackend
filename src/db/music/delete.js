import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Deletes a song.
 * @param {string} musicId The id of the song to delete.
 * @returns {void}
 */
function deleteSong({ musicId }) {
	validateIds(musicId);
	return db.query({
		text: `delete from music where id = $1`,
		values: [musicId],
	});
}

export default deleteSong;
