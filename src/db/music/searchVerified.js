import camelcaseKeys from 'camelcase-keys';
import { expect } from 'chai';

import db from '~/db';
import {
	validateIds,
	/* validateLimit, */ validateSkip,
} from '~/utils/validation';

/**
 * A music result from the database with the search filtered by artist
 * @typedef MusicByArtistResult
 * @property {string} id - The music's ID
 * @property {string} title - The title of the music
 */

/**
 * A music result from the database with the search unfiltered by any
 * specific artist
 * @typedef MusicResult
 * @property {string} id - The music's ID
 * @property {string} artistName - The name of the music's artist
 * @property {string} artistId - The ID of the music's artist
 * @property {string} music - The title of the music
 */

/**
 * Search music from the database
 * @param {*} options
 * @param {string | number} options.limit - The maximum number of music results based on
 * search query to retrieve from the database
 * @param {string | number} options.skip - The offset to start searching for music (used for pagination)
 * @param {number?} options.artistId - A filter for only searching for music created by a certain artist
 * @returns {Promise<MusicByArtistResult[] | MusicResult[]>} - The music search results
 */
async function searchVerified({
	limit: limitStr,
	skip: skipStr,
    userId
}) {

	const skip = Number(skipStr);
	const limit = Number(limitStr);

	validateSkip(skip);
	expect(limit).to.be.at.most(200);

    validateIds(userId);
    const { rows } = await db.query({
        text: `
            select
                music.id,
                case
                    when artist_name is not null then artist_name
                    when artist_name is null then app_user.display_name
                    end as artist_name,
                artist_id,
                title,
                uploader_id,
                duration,
                genre,
                (select count(fav_music_id)
                from favorites
                where fav_music_id = music.id) as favourite_count,
                (select count(fav_music_id) > 0
                from favorites
                where fav_music_id = music.id and user_id = $1) as is_favorite
            from music
                        left join app_user on artist_id = app_user.id
            where is_verified = true
            order by times_used
            offset $2 limit $3;
        `,
        values: [userId, skip, limit],
    });

	return camelcaseKeys(rows);
}

export default searchVerified;
