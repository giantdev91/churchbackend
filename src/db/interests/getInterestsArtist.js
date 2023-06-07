import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * An artist a user is interested in
 * @typedef UserInterestsArtist
 * @property {number} user_id - The ID of the user
 * @property {string} value - The artist
 */

/**
 * Retrieves the artists a user is interested in.
 * @param {*} options
 * @param {string} userId The id of the user.
 * @returns {Promise<UserInterestsArtist[]>} The data of the retrieved interests.
 */
async function getInterestsArtist({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select
			user_id,
			value
			from user_interests_artist
			where user_id = $1;
		`,
		values: [userId],
	});

	return camelcaseKeys(rows);
}

export default getInterestsArtist;
