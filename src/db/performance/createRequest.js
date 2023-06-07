import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Create a new performance request.
 * @param {string} requestedByUserId The id of the user who requested the performance.
 * @param {string} requestedForUserId The id of the user the performance is requested for.
 * @param {string} description The description of the request.
 * @returns {Promise<string>} The id of the newly created performance request.
 */
async function createPost({
	requestedByUserId,
	requestedForUserId,
	description,
}) {
	console.log(requestedByUserId, requestedForUserId)
	validateIds(requestedByUserId, requestedForUserId);

	const {
		rows: [{ id }],
	} = await db.query({
		text: `
			insert into performance_requests (
				requested_by_user_id,
				requested_for_user_id,
				description
			)
			values ($1, $2, $3)
			returning id;
	 `,
		values: [requestedByUserId, requestedForUserId, description],
	});

	return id;
}

export default createPost;
