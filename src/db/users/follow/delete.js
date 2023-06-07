import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Unfollow a user.
 * @param {string} followerId The id of the user who originally initiated the
 * follow request.
 * @param {string} followingId The id of the user who was originally
 * followed.
 * @returns {void}
 */
function unfollowUser({ followerId, followingId }) {
	validateIds(followerId, followingId);
	return db.query({
		text: `delete
		from follow
		where follower_id = $1
			and following_id = $2
`,
		values: [followerId, followingId],
	});
}

export default unfollowUser;
