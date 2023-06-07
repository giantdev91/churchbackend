import db from '~/db';
import { validateArray, validateIds } from '~/utils/validation';

async function updateInterestsCategory({ userId, categories }) {
	validateIds(userId);
	validateArray(categories);

	const insertQuery = db.query({
		text: `INSERT INTO user_interests_category (user_id, value)
			SELECT $1, category FROM unnest($2::text[]) as category WHERE NOT EXISTS
				(SELECT 1 FROM user_interests_category WHERE user_id = $1 AND value = category);
		`,
		values: [userId, categories],
	});

	const deleteQuery = db.query({
		text: `DELETE FROM user_interests_category
			WHERE user_id = $1
				AND value NOT IN
					(SELECT category FROM UNNEST($2::text[]) as category);
		`,
		values: [userId, categories],
	});

	await Promise.all([insertQuery, deleteQuery]);
}

export default updateInterestsCategory;
