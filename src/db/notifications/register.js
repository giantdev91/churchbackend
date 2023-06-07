import db from '~/db/index';
import { validateIds } from '~/utils/validation';

/**
 * Saves a notification to the database
 * @param {string} notifierId The id of the person who initiated the
 * notification (based on some action that involves the notified)
 * @param {string} notifiedId The id of the person who the notification targets
 * @param {string} postId The id of the post involved with the notification
 * @param {string} type The type of notification
 * @returns {void}
 */
function registerNotification({ notifierId, notifiedId, postId, type }) {
	validateIds(notifierId, notifiedId);
	return db.query({
		text: `
			insert into notification (notifier_id, notified_id, post_id, type)
			values ($1, $2, $3, $4);
		`,
		values: [notifierId, notifiedId, postId, type],
	});
}

export default registerNotification;
