import db from '~/db/index';

/**
 * Checks the database to see if a certain username is available for
 * registration (a.k.a. no other user has used this username to register).
 * @param {string} username - The username you would like to check for
 * availability.
 * @returns {Promise<boolean>} - A boolean representing whether the username
 * is available or not.
 */
async function isUsernameAvailable({ username }) {
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*) from app_user where username = $1;
`,
		values: [username],
	});
	return Number(count) === 0;
}

export default isUsernameAvailable;
