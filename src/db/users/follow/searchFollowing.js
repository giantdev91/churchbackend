import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds, validateLimit, validateSkip } from '~/utils/validation';

/**
 * Search users from the list of users whom a user is following.
 * @param {*} options
 * @param {string} options.userId The id of the user whose list of users they're
 * following the search is conducted through.
 * @param {string} options.query The search query to perform.
 * @param {string | number} options.limit - The maximum amount of users to retrieve
 * from the search.
 * @param {string | number} options.skip - The offset of the search results (used for
 * pagination).
 * @returns {Promise<BaseUser[]>} List of users
 */
async function searchUserFollowing({
	userId,
	// query,
	limit: limitStr,
	skip: skipStr,
}) {
	const limit = Number(limitStr);
	const skip = Number(skipStr);
	validateLimit(limit, 'following');
	validateIds(userId);
	validateSkip(skip);
	const { rows } = await db.query({
		text: `select
		app_user.id,
		app_user.username,
		app_user.display_name
	  from app_user
	  inner join follow
	  on follow.following_id = app_user.id
		  where follow.follower_id = $1
	  order by follow.date_followed desc
		  limit $2
	  offset $3
`,
		values: [userId, limit, skip],
	});
	return camelcaseKeys(rows);
}

export default searchUserFollowing;
