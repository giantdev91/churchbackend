import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';

const { validateLimit, validateSkip } = require('~/utils/validation');

/**
 * @typedef PostResult
 * @property {string} id - The ID of the post
 * @property {string} title - The title of the post
 * @property {string} description - The description of the post
 * @property {string} datePosted - The date when the post was posted
 * @property {string} dateUpdated - The date when the post was last updated
 * @property {boolean} isPhoto - Whether or not the post is a photo
 * (otherwise it's a video)
 * @property {string} options.userId - The ID of the user who posted the post
 * @property {string} username - The username of the user who posted the post
 * @property {string} displayName - The display name of the user who posted
 * the post
 * @property {string | undefined} musicTitle - The title of the music used
 * in the post, if the post has music
 */

/**
 * Retrieves the posts made by a specific user.
 * @param {*} options
 * @param {string} options.userId The id of the user of whom you'd like to
 * retrieve posts that they've made.
 * @param {string | number} options.limit - The maximum number of posts to retrieve.
 * @param {string | number} options.skip - The offset of the posts (used for pagination).
 * @returns {Promise<PostResult[]>} The post results along with their
 * information.
 */
async function getPerformancePost({ userId, limit: limitStr, skip: skipStr }) {
	const limit = Number(limitStr);
	const skip = Number(skipStr);

	validateLimit(limit, 'posts');
	validateSkip(skip);

	const { rows } = await db.query({
		text: `select distinct
		on
					(x.id)
		(x.id),
		performance_requests.requested_for_user_id,
		x.user_id,
		x.title,
					x.description,
					x.date_posted,
					x.date_updated,
					x.is_photo,
					x.type,
					x.username,
					x.display_name,
					x.title as music_title,
		performance_requests.status
		from (select
				  post.id,
					post.title,
					post.description,
					post.date_posted,
					post.date_updated,
					post.is_photo,
					post.type,
					app_user.id as user_id,
					app_user.username,
					app_user.display_name,
					music.title as music_title,
					case
						when music.artist_id is null then music.artist_name
						else music_artist_user.username
						end as music_artist_name,
					music.artist_id as music_artist_id,
					music_artist_user.username as music_artist_username,
					post.music_id
				from post
				inner join app_user on post.user_id = app_user.id
				left join music on music.id = post.music_id
				left join app_user as music_artist_user on music.artist_id = music_artist_user.id
				where user_id = $1 AND post.type = 'PERFORMANCE') as x
		inner join performance_requests on x.user_id = performance_requests.requested_by_user_id
		where performance_requests.status = 'COMPLETE'
		order by id desc
		limit $2
		offset $3;
`,
		values: [userId, limit, skip],
	});
	return camelcaseKeys(rows);
}

export default getPerformancePost;
