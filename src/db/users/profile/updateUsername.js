import db from '~/db';
import { validateIds, validateUsername } from '~/utils/validation';

/**
 * Update a user's profile.
 * @param {string} userId The id of the user whose profile you would like to
 * update.
 * @param {string?} username The new username of the user.
 * @returns {void}
 */
function updateUserProfile({
	userId,
	username
}) {
	validateIds(userId);
	validateUsername(username);
	return db.query({
		text: `update app_user set
		  	username = $2
			where id = $1;
`,
		values: [userId, username],
	});
}

export default updateUserProfile;
