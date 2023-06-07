import { expect } from 'chai';

import db from '~/db';
import createUser from '~/db/users/create';
import updateUserProfile from '~/db/users/profile/update';
import { createAuthTokens } from '~/utils/auth';
import createMonz from '~/db/users/monz/create';
import addMonz from '~/db/users/monz/addMonz';

const {
	validateEmail,
	validatePassword,
	validateProfile,
	validateUsername,
} = require('~/utils/validation');

/**
 * Registers a new user
 * @path {POST} /auth/register
 * @body {string} username - The newly registered user's username
 * @body {string} email - The newly registered user's email
 * @body {string} password - The newly registered user's password
 * @body {string} country - The newly registered user's country
 * @body {string?} phoneNumber - The newly registered user's phone number
 * @body {string?} city - The newly registered user's city
 * @body {string?} displayName - The newly registered user's display name (the
 * name that is displayed within the app alongside their username)
 * @body {string} dateOfBirth - The newly registered user's date of birth
 * @body {string} gender - The newly registered user's gender
 * @body {string} referralCode - The newly registered user's inputted referral code
 * @response {object} tokens - Authorization tokens for the user to send
 * alongside future requests when accessing a route
 * @response {string} tokens.refreshToken - Refresh token
 */
async function registerRH(req, res) {
	const {
		username,
		email,
		password,
		country,
		phoneNumber,
		city,
		displayName: possiblyEmptyDisplayName,
		dateOfBirth,
		gender,
		referred_by
	} = req.body;

	const displayName = possiblyEmptyDisplayName || username;

	validateUsername(username);
	// validateEmail(email);
	validatePassword(password);

	// Checking if the email has already been used
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from app_user
		where username = $1
`,
		values: [username],
	});

	expect(Number(count), 'Email address or username already exists.').to.equal(
		0
	);

	validateProfile({ country, displayName, phoneNumber, city });
	const userId = await createUser({
		username,
		email,
		password,
		dateOfBirth,
		gender
	});
	await createMonz({ userId })

	if(referred_by){
		// console.log(referred_by)
		await addMonz({
			userId,
			monz: 50
		});

		const {
			rows
		} = await db.query({
			text: `select id
			from app_user
			where username = $1
	`,
			values: [referred_by],
		});

		await addMonz({
			userId: rows[0].id,
			monz: 50
		})
	}

	await updateUserProfile({ userId, city, displayName, phoneNumber, country });

	// TODO: Add push token registration for new users

	return res.json(await createAuthTokens(userId));
}

export default registerRH;
