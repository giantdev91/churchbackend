import updateUsername from '~/db/users/profile/updateUsername';

/**
 * Update a user's profile
 * @path {PATCH} /users/change-username
 */
async function updateUsernameRH(req, res) {
	const { username } = req.body;
	await updateUsername({
		userId: req.params.userId,
		username
	});
	await res.sendStatus(200);
}

export default updateUsernameRH;