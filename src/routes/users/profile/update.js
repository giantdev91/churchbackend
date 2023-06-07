import updateUserProfile from '~/db/users/profile/update';

/**
 * Update a user's profile
 * @path {PATCH} /users
 */
async function updateUserProfileRH(req, res) {
	const { displayName, bio, phoneNumber, country, city } = req.body;
	await updateUserProfile({
		userId: req.user.id,
		displayName,
		bio,
		phoneNumber,
		country,
		city,
	});
	await res.sendStatus(200);
}

export default updateUserProfileRH;
