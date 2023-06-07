import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';

/**
 * Search for suggested users with a query.
 * @param {*} options
 * @returns {Promise<BaseUser[]>} List of users
 */
async function getSuggestedUsersByCategoryAndGenre({
	category = 'ALL',
	genre = 'ALL',
}) {
	const { rows } = await db.query({
		text: `
		select id, username, display_name
		from app_user
        join suggested_users on suggested_users.user_id = app_user.id
        where suggested_users.category = $1 and suggested_users.genre = $2
		order by priority asc;`,
		values: [category || 'ALL', genre || 'ALL'],
	});

	return camelcaseKeys(rows);
}

export default getSuggestedUsersByCategoryAndGenre;
