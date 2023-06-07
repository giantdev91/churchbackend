import camelcaseKeys from 'camelcase-keys';

import db from '~/db';


/**
 * User stripe buyer id
 * @typedef PrivateStripeBuyerId
 * @property {string} stripe buyer id
 */

/**
 * Gets a user's stripe_buyer_id
 * @param {string} userId The id of the user of whom you would like to
 * retrieve private information.
 * @returns {Promise<PrivateStripeBuyerId>} The private information of the user.
 */
async function getIdFromStripeId({ userId}) {

	const {
		rows: [userInfo],
	} = await db.query({
		text: `SELECT id
		from app_user
		where stripe_customer_id = $1;
`,
		values: [userId],
	});
    
	return camelcaseKeys(userInfo);
}

export default getIdFromStripeId;
