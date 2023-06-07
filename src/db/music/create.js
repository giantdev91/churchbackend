import { expect } from 'chai';

import db from '~/db';
import { validateIds, validateMusic } from '~/utils/validation';

/**
 * Saves music to the database
 * @param {string} uploaderId - The ID of the user that uploaded the music
 * @param {string} title - The title of the music
 * @param {string?} artistId - The ID of the creator/artist of the
 * music (if applicable, sometimes the artist doesn't have an account)
 * @param {string?} artistName - The name of the artist who created the
 * music in the event that they don't have an account
 * @param {number} duration - The duration of the music in milliseconds
 * @param {string} genre - The genre of the music
 * @returns {Promise<string>} - The newly added music's ID
 */
async function createMusic({
	uploaderId,
	title,
	artistId,
	artistName,
	duration,
	genre,
}) {
	validateIds(uploaderId);
	validateMusic({ title, artistId, artistName });
	expect(duration, 'Duration should be a number greater than 0.')
		.to.be.a('number')
		.and.above(0);
	let musicId;
	if (artistId) {
		({
			rows: [{ id: musicId }],
		} = await db.query({
			text: `
				insert into music (uploader_id, artist_id, title, duration, has_linked_account, genre)
				values ($1, $2, $3, $4, true, $5)
				returning id;
			`,
			values: [uploaderId, artistId, title, duration, genre],
		}));
	} else {
		({
			rows: [{ id: musicId }],
		} = await db.query({
			text: `
				insert into music (uploader_id, artist_name, title, duration, has_linked_account, genre)
				values ($1, $2, $3, $4, false, $5)
				returning id;
			`,
			values: [uploaderId, artistName, title, duration, genre],
		}));
	}
	return musicId;
}

export default createMusic;
