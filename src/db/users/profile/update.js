import db from '~/db';
import { validateIds, validateProfile } from '~/utils/validation';

/**
 * Update a user's profile.
 * @param {string} userId The id of the user whose profile you would like to
 * update.
 * @param {string?} displayName The new display name of the user.
 * @param {string?} bio The new bio of the user.
 * @param {string?} phoneNumber The new phone number of the user.
 * @param {string?} country The user's new country.
 * @param {string?} city The user's new city.
 * @returns {void}
 */
function updateUserProfile({
	userId,
	displayName,
	bio,
	phoneNumber,
	country,
	city,
	referred_by
}) {
	validateIds(userId);
	validateProfile({
		displayName,
		bio,
		phoneNumber,
		country,
		city,
	});
	return db.query({
		text: `update app_user set
		  display_name = coalesce($2, display_name),
			bio = coalesce($3, bio),
			phone_number = coalesce($4, phone_number),
			country = coalesce($5, country),
			city = coalesce($6, city) 
		where id = $1;
`,
		values: [userId, displayName, bio, phoneNumber, country, city],
	});
}

export default updateUserProfile;
