import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

// Nahid: don't need a limit now, maybe later

/**
 * A music result from the database with the search filtered by artist
 * @typedef FavoritedMusic
 * @property {string} id - The id of the favorited music
 */

/**
 * Seach favorited users of a given user
 * @param {string} userId - query for this user
 * @param {string | number} limit - The maximum number of favorited musics
 * based on query to retrive from the database
 * @returns {Promise<FavoritedMusic[]>} - The favorited musics
 */

async function searchfavmusic({ userId }) {
	validateIds(userId);
	const { rows } = await db.query(
		`
        select
        music.id,
        case
            when artist_name is not null then artist_name
            when artist_name is null then app_user.display_name
            end as artist_name,
        artist_id,
        title,
        (select count(fav_music_id)
        from favorites
        where fav_music_id = music.id) as favourite_count,
        (select count(fav_music_id) > 0
        from favorites
        where fav_music_id = music.id and user_id = $1) as is_favorite
        from music
                    left join app_user on artist_id = app_user.id
        where music.id in (
            select
            favorites.fav_music_id
            from favorites
            where user_id = $1 AND fav_music_id IS NOT NULL
        )
        order by date_uploaded;
        `,
		[userId]
	);
	console.log('fav', rows);
	return camelcaseKeys(rows);
}

export default searchfavmusic;
