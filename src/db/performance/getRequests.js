import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * @typedef PerformanceRequest
 * @property {string} id - The ID of the performance request
 * @property {string} requested_by_user_id - the user id of the user requesting the performance
 * @property {string} requested_for_user_id - the user id of the performer
 * @property {string} description - The description of the request
 * @property {string} status - The status of the request
 * @property {string} requested_date - The date when the performance was created
 */

/**
 * Get the information of performance request based on the requested for id
 * @path {GET} /requests/user/:userId
 * @params {string} userId - The user id of the request for user
 * @params {string} status - Comma separated list of statuses
 * @params {string} limit - max number of records returned
 * @params {string} offset - record offset
 * @response {PerformanceRequest} - Information about the performance request
 */
async function getRequestsByRequestedForUserId(userId, status, page, limit) {
	validateIds(userId);

	let queryText = `select display_name as user_display_name,requested_for_user_id, description,status,requested_by_user_id,requested_date,performance_requests.id
	from performance_requests
	INNER JOIN app_user ON app_user.id = requested_by_user_id
	where requested_for_user_id = $1 and status = any ($2)`;

	let statuses;
	if (!status) {
		statuses = ['NEW', 'COMPLETE', 'CANCELLED'];
	} else {
		statuses = status.split(',');
	}

	const queryParms = [userId, statuses];

	if (limit && page && limit > 0 && page > 0) {
		queryText += ' limit $3 offset $4';
		queryParms.push(limit, (page - 1) * limit);
	}

	const { rows } = await db.query({
		text: queryText,
		values: queryParms,
	});
	return camelcaseKeys(rows);
}

export default getRequestsByRequestedForUserId;
