import unblockUser from '~/db/users/block/delete';

/**
 * Unblock a user
 * @path {POST} users/unblock/:userId
 * @params {string} options.userId - The ID of the user to unblock
 */
async function unblockUserRH(req, res) {
	await unblockUser({ blockerId: req.user.id, blockedId: req.params.userId });
	await res.sendStatus(200);
}

export default unblockUserRH;
