import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

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
async function getStripeBuyerId({ userId }) {

	const {
		rows: [userInfo],
	} = await db.query({
		text: ` select stripe_buyer_id
		from app_user
		where id = $1;
`,
		values: [userId],
	});

	return camelcaseKeys(userInfo);
}

export default getStripeBuyerId;
