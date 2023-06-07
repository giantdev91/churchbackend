import camelcaseKeys from 'camelcase-keys';

import db from '~/db';

/**
 * A music result from the database
 * @typedef Music
 * @property {string} hasLinkedAccount - Specifies whether or not the music
 * artist has a linked Muqo account
 * @property {string} artistId - The ID of the artist account (only applicable
 * if the artist has a linked Muqo account)
 * @property {string} artistName - The name of the artist
 * @property {string} title - The title of the music
 * @property {number} duration - The duration of the music in milliseconds
 * @property {string} genre - The genre of the music
 */

/**
 * Gets music information from the database
 * @param {string} musicId The id of the music you wish to retrieve
 * @returns {Promise<Music>} Returns the music data of the music associated with
 * the provided id
 */
async function getMusic({ musicId }) {
	const { rows } = await db.query({
		text: `
			select
				has_linked_account,
				artist_id,
				artist_name,
				uploader_id,
				title,
				duration,
				frontPage,
				genre,
				
			from music where id = $1
		`,
		values: [musicId],
	});
	return camelcaseKeys(rows[0]);
}

export default getMusic;
