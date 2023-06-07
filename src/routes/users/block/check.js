import isUserBlocked from '~/db/users/block/check';

/**
 * Checks whether or not a user has blocked somebody
 * @path {GET} users/block/:userId
 * @params {string} options.userId - The ID of the user
 * @response {{ isBlocked: boolean }} isBlocked - Whether or not the user is
 * blocked
 */
async function isUserBlockedRH(req, res) {
	const blockStatus = await isUserBlocked({
		blockerId: req.user.id,
		blockedId: req.params.userId,
	});
	await res.json({ isBlocked: blockStatus });
}

export default isUserBlockedRH;
