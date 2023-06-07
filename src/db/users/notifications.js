import camelcaseKeys from 'camelcase-keys';

import db from '~/db/index';
import {
	validateIds,
	validateLimit,
	validateNotificationType,
} from '~/utils/validation';

/**
 * @typedef NotificationData
 * @property {string} id - The ID of the notification
 * @property {string} title - The title of the notification
 * @property {string} postId - The ID of the corresponding post
 * @property {string} userDisplayName - The display name of the notifier
 * @property {string} options.userId - The user ID of the notifier
 * @property {string} type - The type of notification
 */

/**
 * Retrieve the notifications for a specific user.
 * @param {string} notifiedId The id of the user for whom you'd like to
 * retrieve their notifications.
 * @param {string} type The type of notification to fetch.
 * @param {number} limit The number of notifications to fetch.
 * @returns {Promise<NotificationData[]>} The notifications and their
 * corresponding data.
 */
async function getNotifications({ notifiedId, type, limit: limitStr }) {
	const limit = Number(limitStr);

	validateIds(notifiedId);
	validateNotificationType(type);
	validateLimit(limit, 'notifications');

	const { rows } = await db.query({
		text: `select
		  notification.id,
			post.title as post_title,
			post.id as post_id,
			app_user.display_name as user_display_name,
			notification.notifier_id as user_id,
			notification.type
		from notification
			left join post on post.id = post_id
			inner join app_user on app_user.id = notifier_id
		where notified_id = $1
		and notification.type = $2
		order by date_notified desc
		limit $3;
`,
		values: [notifiedId, type, limit],
	});
	return camelcaseKeys(rows);
}

export default getNotifications;
