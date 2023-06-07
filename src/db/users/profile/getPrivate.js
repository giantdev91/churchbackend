import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * User info that is seen by only the actor
 * @typedef PrivateUserInfo
 * @property {string} username
 * @property {string} email
 * @property {string} displayName
 * @property {string} bio
 * @property {string} phoneNumber
 * @property {string} country
 * @property {string} city
 * @property {number} score
 * @property {string} stripe_customer_id
 * @property {string} stripe_buyer_id
 * @property {bool} stripe_customer_onboarding
 */

/**
 * Gets a user's private information (username, display name, bio, phane
 * number, country, city, score, stripe_customer_id)
 * @param {string} userId The id of the user of whom you would like to
 * retrieve private information.
 * @returns {Promise<PrivateUserInfo>} The private information of the user.
 */
async function getUserPrivateInfo({ userId }) {
	validateIds(userId);
	const {
		rows: [userInfo],
	} = await db.query({
		text: `select id,
			username,
			email,
			display_name,
			bio,
			phone_number,
			country,
			city,
			score,
			stripe_customer_id,
			stripe_customer_onboarding,
			stripe_buyer_id
		from app_user
		where id = $1;
`,
		values: [userId],
	});

	return camelcaseKeys(userInfo);
}

export default getUserPrivateInfo;
