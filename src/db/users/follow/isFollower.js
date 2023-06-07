import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Checks if a user is a follower of another user.
 * @param {string} followerId The user who would have initiated the follow
 * request.
 * @param {string} followingId The user who would have been followed by the
 * follow request.
 * @returns {Promise<boolean>} A boolean representing if the specified user
 * (followerId) is following the other specified user (followedId)
 */
async function isUserFollower({ followerId, followingId }) {
	validateIds(followerId, followingId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from follow
		where follower_id = $1
			and following_id = $2;
`,
		values: [followerId, followingId],
	});
	return count > 0;
}

export default isUserFollower;
