import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Follow a user.
 * @param {string} followerId The id of the person who initiated the follow
 * request.
 * @param {string} followingId The id of the user that the follower requested to
 * follow.
 * @returns {void}
 */
function followUser({ followerId, followingId }) {
	validateIds(followerId, followingId);
	return db.query({
		text: `insert into follow (follower_id, following_id)
		values ($1, $2);
`,
		values: [followerId, followingId],
	});
}

export default followUser;
