import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Update a user's profile.
 * @param {string} userId The id of the user whose profile you would like to
 * update.
 * @returns {void}
 */
function setVerifiedMusic({
	userId,
}) {
	validateIds(userId);
	return db.query({
		text: `update music set is_verified = true where uploader_id = $1;
`,
		values: [userId],
	});
}

export default setVerifiedMusic;
