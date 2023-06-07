import bcrypt from 'bcryptjs';

import db from '~/db/index';
import updateInterestsArtist from '~/db/interests/updateInterestsArtist';
import updateInterestsCategory from '~/db/interests/updateInterestsCategory';
import updateInterestsGenre from '~/db/interests/updateInterestsGenre';
import { validateEmail, validateUsername } from '~/utils/validation';

/**
 * Creates a new user.
 * @param {string} username The username of the user (must be unique).
 * @param {string} email The email of the user (must be unique).
 * @param {string} password The user's password.
 * @param {string} dateOfBirth The user's date of birth
 * @param {string} gender The user's gender
 * @returns {Promise<string>} The ID of the newly created user.
 */
async function createUser({
	username,
	email,
	phoneNumber,
	password,
	dateOfBirth,
	gender,
	genres,
	categories,
	artists,
}) {
	validateUsername(username);
	// validateEmail(email);
	const passwordHash = bcrypt.hashSync(password, 10);
	await db.query({
		text: `SELECT setval('feature_flack_id_seq', (SELECT MAX(id) FROM feature_flack));
`,
	});

	await db.query({
		text: ` 
		insert into feature_flack
		(username, email)
		values ($1, $2);
`,
		values: [username, email],
	});

	const {
		rows: [{ id }],
	} = await db.query({
		text: `insert into app_user
			(username, display_name, email, date_of_birth, gender, phone_number, password_hash)
		values ($1, $1, $2, $3, $4, $5, $6)
		returning id;
`,
		values: [
			username,
			email,
			dateOfBirth,
			gender,
			phoneNumber,
			passwordHash
		],
	});

	if (genres && typeof genres === 'object' && genres.length > 0) {
		updateInterestsGenre({ userId: id, genres });
	}

	if (categories && typeof categories === 'object' && categories.length > 0) {
		updateInterestsCategory({ userId: id, categories });
	}

	if (artists && typeof artists === 'object' && artists.length > 0) {
		updateInterestsArtist({ userId: id, artists });
	}

	return id;
}

export default createUser;
