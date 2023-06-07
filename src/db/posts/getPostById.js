import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';

async function getPostById(postId) {
	const { rows } = await db.query({
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
				where post.id = $1
				order by post.date_posted desc;
		`,
		values: [postId],
	});
	return camelcaseKeys(rows[0]);
}

export default getPostById;
