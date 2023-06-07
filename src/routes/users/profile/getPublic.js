import { expect } from 'chai';

import isUserBlocked from '~/db/users/block/check';
import isUserFollower from '~/db/users/follow/isFollower';
import { getUserPublicProfile } from '~/utils/profile';

/**
 * Get a user's private profile (includes information that only they should be
 * able to see)
 * @path {GET} /:userId/profile/
 * @params {string} options.userId - ID of the user whose profile you wish to retrieve
 */
async function getUserPublicProfileRH(req, res) {
	// Checking if the requestor isn't blocked
	expect(
		await isUserBlocked({
			blockerId: req.params.userId,
			blockedId: req.user.id,
		}),
		'You are blocked by this user.'
	).to.be.false;
	const profile = await getUserPublicProfile(req.params.userId);

	await res.json({
		...profile,
		isFollower: await isUserFollower({
			followerId: req.user.id,
			followingId: req.params.userId,
		}),
	});
}

export default getUserPublicProfileRH;
