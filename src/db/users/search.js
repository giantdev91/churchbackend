import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';
import { validateIds, validateLimit, validateSkip } from '~/utils/validation';

/**
 * Search users with a query.
 * @param {*} options
 * @param {string} options.actorId The id of the user who initiated the block.
 * @param {string} options.query The search query to be compared against a user's username.
 * @param {string | number} options.limit - The maximum number of users to retrieve.
 * @param {string | number} options.skip - The offset of the search (used for pagination).
 * @returns {Promise<BaseUser[]>} List of users
 */
async function searchUsers({ actorId, query, limit: limitStr, skip: skipStr }) {
	const skip = Number(skipStr);
	const limit = Number(limitStr);

	validateIds(actorId);
	validateSkip(skip);
	validateLimit(limit, 'users');

	const { rows } = await db.query({
		text: `
		select id, username, display_name, is_verified
		from app_user
		where username ilike concat($2::text, '%') or display_name ilike concat($2::text, '%') 
		and id not in (
		select blocker_id
		from block
		where blocked_id =$1 )
		order by score desc
		limit $3 offset $4;`,
		values: [actorId, query, limit, skip],
	});

	return camelcaseKeys(rows);
}

export default searchUsers;
