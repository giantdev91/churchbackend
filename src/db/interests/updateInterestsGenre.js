import db from '~/db';
import { validateArray, validateIds } from '~/utils/validation';

async function updateInterestsGenre({ userId, genres }) {
	validateIds(userId);
	validateArray(genres);
	const insertQuery = db.query({
		text: `INSERT INTO user_interests_genre (user_id, value)
			SELECT $1, genre FROM unnest($2::text[]) as genre WHERE NOT EXISTS
				(SELECT 1 FROM user_interests_genre WHERE user_id = $1 AND value = genre);
		`,
		values: [userId, genres],
	});

	const deleteQuery = db.query({
		text: `DELETE FROM user_interests_genre
			WHERE user_id = $1
				AND value NOT IN
					(SELECT genre FROM UNNEST($2::text[]) as genre);
		`,
		values: [userId, genres],
	});

	await Promise.all([insertQuery, deleteQuery]);
}

export default updateInterestsGenre;
