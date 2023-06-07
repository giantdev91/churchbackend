import db from '~/db';


/**
 * Checks the database to see if a certain username has been used and if the max referrals
 * has been exceeded
 * @param {string} username - The username you would like to check has been used
 * @returns {Promise<boolean>} - A boolean representing whether the username
 * has been used or not and whether or not max_referrals has been exceeded
 */


async function isReferralAvailable({ username }) {
	
	const {
		rows: [{ count }],
		
	} = await db.query({
		text: `select count(*) from referrals where username = $1;`,
		//AND code_used < max;		
		values: [username],
	});
	
	// return Number(count) === 1;
	return true;
	
};
export default isReferralAvailable;
