import camelcaseKeys from 'camelcase-keys';
import { expect } from 'chai';

import db from '~/db';
import {
	validateIds,
	validateLimit,
	validatePostCategories,
	validateSkip,
} from '~/utils/validation';

/**
 * A trending post to be displayed in the trending page
 * @typedef TrendingPost
 * @property {string} id - The ID of the post
 * @property {string} title - The title of the post
 * @property {string} username - The  of the user who posted the post
 * @property {string} userDisplayName - The display name of the user who posted
 * the post
 * @property {number} numLikes - The number of likes the post has amassed
 * @property {string | undefined} musicTitle - The title of the music used
 * in the post, if the post has music
 * @property {string | undefined} musicArtistUsername - The username of the
 * artist whose music was used in the post, if the post has music, and if
 * the artist has an account
 * @property {string | undefined} musicArtistName - The name of the
 * artist whose music was used in the post, if the post has music
 * @property {number | undefined} musicArtistId - The ID of the
 * artist whose music was used in the post, if the post has music, and if
 * the artist has an account
 */

/**
 * Retrieves the trending posts based on their like count.
 * @param {*} options
 * @param {string} options.actorId The id of the user who initiated the block.
 * @param {string?} options.category If specified, the category to filter posts.
 * @param {string | number} options.limit - The maximum number of posts to retrieve.
 * @param {string | number} options.skip - The offset of the result (used for pagination).
 * @returns {Promise<TrendingPost[]>} The data of the retrieved posts.
 */
async function getTrending({
	actorId,
	category = null,
	limit: limitStr,
	skip: skipStr,
}) {
	const limit = Number(limitStr);
	const skip = Number(skipStr);

	if (category) {
		validatePostCategories(category);
	}
	validateIds(actorId);
	validateLimit(limit, 'trending');
	validateSkip(skip);

	// Only show a max of 20 top trending videos
	expect(skip + limit).to.be.below(51);
	let rows;
	console.log('Category:', category);
	if (category) {
		({ rows } = await db.query({
			text: `select
				post.title,
				post.id,
				app_user.display_name as user_display_name,
				app_user.username,
				app_user.id as user_id,
				post.date_posted,
				music.title as music_title,
				case
					when music.artist_id is null then music.artist_name
					else music_artist_user.username
					end as music_artist_name,
				music.artist_id as music_artist_id,
				music_artist_user.username as music_artist_username,
			    post_category.category,
				post_genre.genre
			from post
			inner join post_category on id = post_category.post_id
			inner join app_user on app_user.id = post.user_id
			left join music on music.id = post.music_id
			left join app_user as music_artist_user on music.artist_id = music_artist_user.id
			left join post_genre on post.genre_id = post_genre.id
			where post_category.category = $2 and 
			post.type = 'REGULAR' and
			app_user.id not in (
				select blocker_id
				from block
				where blocked_id =$1 )
			order by post.date_posted desc
			limit $3
			offset $4;
	`,
			values: [actorId, category, limit, skip],
		}));
	} else {
		({ rows } = await db.query({
			text: `
				select
					post.title as post_title,
					post.id as post_id,
					post.is_photo as is_photo,
					app_user.display_name as user_display_name,
					app_user.username,
					app_user.id as user_id,
					post.date_posted,
					music.title as music_title,
					case
						when music.artist_id is null then music.artist_name
						else music_artist_user.username
						end as music_artist_name,
					music.artist_id as music_artist_id,
					music_artist_user.username as music_artist_username,
					post_category.category,
					post_genre.genre
				from post
					inner join app_user on app_user.id = post.user_id
					left join music on music.id = post.music_id
					left join post_genre on post.genre_id = post_genre.id
					left join app_user as music_artist_user on music.artist_id = music_artist_user.id
					left join post_category on post.id = post_category.post_id
					where app_user.id not in (
						select blocker_id
						from block
						where blocked_id =$1 )
					and post.type = 'REGULAR'
				order by post.date_posted desc
				limit $2
				offset $3;
			`,
			values: [actorId, limit, skip],
		}));
	}
	return camelcaseKeys(rows);
}

export default getTrending;
