import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds, validateLimit, validateSkip } from '~/utils/validation';

/**
 * @typedef PostComment
 * @property {string} id - The comment's ID
 * @property {string} content - The content of the comment
 * @property {string} datePosted - The date the comment was posted
 * @property {string} username - The username of the user who posted the comment
 * @property {string} displayName - The display name of the user who posted the
 * comment
 */

/**
 * Gets recent comments for a music.
 * @param {*} options
 * @param {string} options.musicId The id of the post for which you would
 * like to retrieve comments.
 * @param {string | number} options.limit - The maximum amount of comments to retrieve
 * @param {string | number} options.skip - The offset for retrieving comments from the
 * database (used for pagination)
 * @returns {Promise<PostComment[]>} Returns the retrieved comments' information
 */
async function getMusicComments({ musicId, limit: limitStr, skip: skipStr }) {
	const limit = Number(limitStr);
	const skip = Number(skipStr);

	validateIds(musicId);
	validateSkip(skip);
	validateLimit(limit, 'comments');

	const { rows } = await db.query({
		text: `select music_comment.id,
			music_comment.content,
			music_comment.date_posted,
			music_comment.user_id,
			app_user.username,
			app_user.display_name
		from music_comment
					 inner join app_user
											on music_comment.user_id = app_user.id
		where music_comment.music_id = $1
		order by music_comment.date_posted desc
		limit $2 offset $3
`,
		values: [musicId, limit, skip],
	});
	return camelcaseKeys(rows);
}

export default getMusicComments;
