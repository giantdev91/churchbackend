import db from '~/db';
import { validateArray, validateIds } from '~/utils/validation';

async function updateInterestsArtist({ userId, artists }) {
	validateIds(userId);
	validateArray(artists);
	const insertQuery = db.query({
		text: `INSERT INTO user_interests_artist (user_id, value)
			SELECT $1, artist FROM unnest($2::text[]) as artist WHERE NOT EXISTS
				(SELECT 1 FROM user_interests_artist WHERE user_id = $1 AND value = artist);
		`,
		values: [userId, artists],
	});

	const deleteQuery = db.query({
		text: `DELETE FROM user_interests_artist
			WHERE user_id = $1
				AND value NOT IN
					(SELECT artist FROM UNNEST($2::text[]) as artist);
		`,
		values: [userId, artists],
	});

	await Promise.all([insertQuery, deleteQuery]);
}

export default updateInterestsArtist;
