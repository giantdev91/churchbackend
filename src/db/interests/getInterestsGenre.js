import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * A genre a user is interested in
 * @typedef UserInterestsGenre
 * @property {number} user_id - The ID of the user
 * @property {string} value - The genre
 */

/**
 * Retrieves the genre a user is interested in.
 * @param {*} options
 * @param {string} userId The id of the user.
 * @returns {Promise<UserInterestsGenre[]>} The data of the retrieved interests.
 */
async function getInterestsGenre({ userId }) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select
			user_id,
			value
			from user_interests_genre
			where user_id = $1;
		`,
		values: [userId],
	});

	return camelcaseKeys(rows);
}

export default getInterestsGenre;
