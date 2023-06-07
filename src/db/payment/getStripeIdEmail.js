import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * User stripe id and email
 * @typedef PrivateStripeIdEmail
 * @property {string} stripe_customer_id
 * @property {string} email
 */

/**
 * Gets a user's stripe_customer_id and email
 * @param {string} userId The id of the user of whom you would like to
 * retrieve private information.
 * @returns {Promise<PrivateStripeIdEmail>} The private information of the user.
 */
async function getStripeIdEmail({ userId }) {
	validateIds(userId);
	const {
		rows: [userInfo],
	} = await db.query({
		text: `select email,
			stripe_customer_id,
			stripe_customer_onboarding
		from app_user
		where id = $1;
`,
		values: [userId],
	});

	return camelcaseKeys(userInfo);
}

export default getStripeIdEmail;
