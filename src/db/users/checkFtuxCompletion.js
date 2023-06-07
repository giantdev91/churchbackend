import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Retrieve the status of the first-time user experience flag as completed.
 * @param {string} userId The id of the user whose first-time experience
 * flag you'd like to check
 * @returns {Promise<boolean>} A boolean whether or not a user's first-time
 * user experience has been completed.
 */
async function checkFtuxCompletion({ userId }) {
	validateIds(userId);
	const {
		rows: [{ ftux_completed: ftuxCompleted }],
	} = await db.query({
		text: `
			select ftux_completed
			from app_user
			where id = $1;
		`,
		values: [userId],
	});
	return ftuxCompleted;
}

export default checkFtuxCompletion;
