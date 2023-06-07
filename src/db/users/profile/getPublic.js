import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * A user's info that can be viewed by any user
 * @typedef PublicUserInfo
 * @property {string} username
 * @property {string} displayName
 * @property {string} bio
 * @property {string} country
 * @property {string} city
 * @property {number} score
 * @property {string} stripe_customer_id
 * @property {bool} stripe_customer_onboarding
 */

/**
 * Gets a user's public information (username, display name, bio, country,
 * city, score)
 * @param {string} userId The id of the user of whom you would like to
 * retrieve public information.
 * @returns {Promise<PublicUserInfo>} The public information of the user.
 *
 */
async function getUserPublicInfo({ userId }) {
	validateIds(userId);
	const {
		rows: [userInfo],
	} = await db.query({
		text: `
			select id,
				username,
				display_name,
				bio,
				country,
				city,
				score,
				stripe_customer_id,
				stripe_customer_onboarding,
				is_verified
			from app_user
			where id = $1
		`,
		values: [userId],
	});
	return camelcaseKeys(userInfo);
}

export default getUserPublicInfo;
