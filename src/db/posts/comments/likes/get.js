import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds, validateLimit, validateSkip } from '~/utils/validation';

/**
 * Gets the users who've liked a certain comment.
 * @param {*} options
 * @param {string} options.commentId The id of the comment for which you would like to retrieve the likes.
 * @param {string | number} options.limit - The maximum amount of users to retrieve
 * @param {string | number} options.skip - The offset of the results (used for
 * pagination).
 * @returns {Promise<BaseUser[]>} Returns a list of users who've liked
 * the comment
 */
async function getCommentLikes({ commentId, limit: limitStr, skip: skipStr }) {
	const skip = Number(skipStr);
	const limit = Number(limitStr);

	validateIds(commentId);
	validateLimit(limit, 'likes');
	validateSkip(skip);

	const { rows } = await db.query({
		text: `select
      app_user.id,
			app_user.username,
			app_user.display_name,
		from post_comment_like
    inner join app_user
    on post_comment_like.user_id = app_user.id
		where post_comment_like.comment_id = $1
    order by post_comment_like.date_liked desc
		limit $2
    offset $3
 `,
		values: [commentId, limit, skip],
	});
	return camelcaseKeys(rows);
}

export default getCommentLikes;
