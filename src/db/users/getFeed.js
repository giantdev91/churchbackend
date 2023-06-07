import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateLimit, validateSkip } from '~/utils/validation';

/**
 * Retrieve all posts that were posted by those the user follows.
 * @param {*} options
 * @param {string} options.userId The id of the user whose feed to retrieve.
 * @param {string | number} options.limit - The maximum number of posts to retrieve.
 * @param {string | number} options.skip - The offset of the searched posts (used for
 * pagination).
 * @returns {Promise<PostResult[]>} The post results, skips over private posts.
 */
async function getFeed({ userId, limit: limitStr, skip: skipStr }) {
	const limit = Number(limitStr);
	const skip = Number(skipStr);

	validateLimit(limit, 'feed');
	validateSkip(skip);

	// Language=sql
	const { rows } = await db.query({
		text: `select post.id,
			post.title,
			post.description,
			post.date_posted,
			post.date_updated,
			post.is_photo,
			post_genre.genre,
			app_user.id as user_id,
			app_user.username,
			app_user.display_name,
			music.title as music_title,
		  case
		    when music.artist_id is null then music.artist_name
				else music_artist_user.username
			end as music_artist_name,
		  music.artist_id as music_artist_id,
			music_artist_user.username as music_artist_username
		from post																									
	  inner join app_user on post.user_id = app_user.id
		left join music on music.id = post.music_id
		left join app_user as music_artist_user on music.artist_id = music_artist_user.id
		left join post_genre on post.genre_id = post_genre.id
		where (
					post.user_id in
					(select following_id from follow where follower_id = $1)
				or post.user_id = $1
			)
			and post.is_processing = false
			and post.is_private = false
		and post.type = 'REGULAR'
		order by post.date_posted desc
		limit $2 offset $3;
`,
		values: [userId, limit, skip],
	});

	return camelcaseKeys(rows);
}

export default getFeed;
