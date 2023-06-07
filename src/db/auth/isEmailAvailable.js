import db from '~/db';

/**
 * Checks the database to see if a certain email is available for
 * registration (a.k.a. no other user has used this email to register).
 * @param {string} email - The email you would like to check for availability
 * @returns {Promise<boolean>} - A boolean representing whether the email is
 * available or not
 */
async function isEmailAvailable({ email }) {
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*) from app_user where email = $1;
`,
		values: [email],
	});	
	return Number(count) === 0;
}

export default isEmailAvailable;
