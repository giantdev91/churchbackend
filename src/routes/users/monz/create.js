import createMonz from '~/db/users/monz/create';

/**
 * Update a user's profile
 * @path {PATCH} /users
 */
async function createMonzRH(req, res) {
	await createMonz({
		userId: req.params.userId,
	});
	await res.sendStatus(200);
}

export default createMonzRH;