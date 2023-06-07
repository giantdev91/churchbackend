import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds, validateLimit, validateSkip } from '~/utils/validation';

/**
 * Gets the users who've liked a certain post.
 * @param {*} options
 * @param {string} options.postId The id of the post for which you would like to
 * retrieve the likes.
 * @param {string | number}  options.limit - The maximum amount of users to retrieve
 * @param {string | number} options.skip - The offset of the results (used for
 * pagination).
 * @returns {Promise<BaseUser[]>} List of users
 */
async function getPostLikes({ postId, limit: limitStr, skip: skipStr }) {
	const skip = Number(skipStr);
	const limit = Number(limitStr);

	validateIds(postId);
	validateLimit(limit, 'likes');
	validateSkip(skip);

	const { rows } = await db.query(`
    select
      app_user.id as user_id,
			app_user.username,
			app_user.display_name
		from post_like
    inner join app_user
    on post_like.user_id = app_user.id
		where post_like.post_id = $1
    order by post_like.date_liked desc
		limit $2
    offset $3
  `, [postId, limit,skip]);

	return camelcaseKeys(rows);
}

export default getPostLikes;
