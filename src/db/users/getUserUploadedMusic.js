import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';

const { validateLimit, validateSkip } = require('~/utils/validation');

/**
 * @typedef MusicResult
 * @property {string} id - The ID of the post
 * @property {string} title - The title of the post
 * @property {string} duration - The duration of the music
 * @property {string} dateUploaded - The date when the music was uploaded
 */

/**
 * Retrieves the music uploaded by a specific user.
 * @param {*} options
 * @param {string} options.userId - The id of the user of whom you'd like to
 * retrieve music that they've uploaded.
 * @param {string | number} options.limit - The maximum number of music entries to retrieve.
 * @param {string | number} options.skip - The offset of the music (used for pagination).
 * @returns {Promise<PostResult[]>} The music results along with their information.
 */
async function getUserUploadedMusic({
	userId,
	limit: limitStr,
	skip: skipStr,
}) {
	const limit = Number(limitStr);
	const skip = Number(skipStr);

	validateLimit(limit, 'trending');
	validateSkip(skip);
	const { rows } = await db.query({
		text: `
			select id,
				title,
				duration,
				date_uploaded
			from music
			where artist_id = $1
			order by date_uploaded desc
			limit $2 offset $3;
		`,
		values: [userId, limit, skip],
	});
	return camelcaseKeys(rows);
}

export default getUserUploadedMusic;
