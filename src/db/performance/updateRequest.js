import camelcaseKeys from 'camelcase-keys';

import db from '~/db';

/**
 * Update the information of performance request based on the requested for id
 * @path {GET} /posts/:postId
 * @params {string} userId - The user id of the request for user
 * @returns {Promise<string>} The id of the updated performance request.
 */
async function updatePerformanceRequestStatus({ id, status }) {
	const { rows } = await db.query({
		text: `update performance_requests
                set status = $2
		        where id = $1
            `,
		values: [id, status],
	});
	return camelcaseKeys(rows);
}

export default updatePerformanceRequestStatus;
