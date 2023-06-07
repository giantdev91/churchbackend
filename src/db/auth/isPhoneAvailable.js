import db from '~/db';

/**
 * Checks the database to see if a certain phone is available for
 * registration (a.k.a. no other user has used this phone to register).
 * @param {string} phone - The phone you would like to check for availability
 * @returns {Promise<boolean>} - A boolean representing whether the phone is
 * available or not
 */
async function isPhoneAvailable({ phone_number }) {
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*) from app_user where phone_number = $1;
`,
		values: [phone_number],
	});	
	return Number(count) === 0;
}

export default isPhoneAvailable;
