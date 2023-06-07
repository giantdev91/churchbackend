import camelcaseKeys from 'camelcase-keys';

import db from '~/db';

const {
	validateIds,
	validateLimit,
	validateSkip,
	// validateUsername,
} = require('~/utils/validation');

/**
 * Search users from the list of users who've followed a particular user.
 * @param {*} options
 * @param {string} options.userId The id of the user whose followers you are
 * searching through.
 * @param {string} options.query The search query to perform.
 * @param {string | number} options.limit - The maximum amount of users to retrieve
 * from the search.
 * @param {string | number} options.skip - The offset of the search results (used for
 * pagination).
 * @returns {Promise<BaseUser[]>} List of users
 */
async function searchUserFollowers({
	userId,
	// query,
	limit: limitStr,
	skip: skipStr,
}) {
	const skip = Number(skipStr);
	const limit = Number(limitStr);

	validateIds(userId);
	// validateUsername(query);
	validateSkip(skip);
	validateLimit(limit, 'followers');

	const { rows } = await db.query({
		text: `
		select
		app_user.id,
		app_user.username,
		app_user.display_name
	  from app_user
	  inner join follow
	  on follow.follower_id = app_user.id
		  where follow.following_id = $1
	  order by follow.date_followed desc
		  limit $2
	  offset $3
 `,
		values: [userId, limit, skip],
	});

	return camelcaseKeys(rows);
}

export default searchUserFollowers;
