import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds, validateLimit } from '~/utils/validation';

/**
 * A music result from the database with the search filtered by artist
 * @typedef FavoritedUsers
 * @property {string} id - The id of the favorited user
 */

/**
 * Seach favorited users of a given user
 * @param {string} userId - query for this user
 * @param {string | number} limit - The maximum number of favorited users
 * based on query to retrive from the database
 * @returns {Promise<FavoritedUsers[]>} - The favorited users
 */

async function searchfavusers({ userId, limit: limitStr }) {
	const limit = Number(limitStr);
	validateLimit(limit, 'favUser');
	validateIds(userId);

	const { rows } = await db.query(
		`
        select
        fav_user_id
        from favorites
        where user_id = $1 AND fav_user_id IS NOT NULL
        limit $2
        `,
		[userId, limit]
	);

	return camelcaseKeys(rows);
}

export default searchfavusers;
