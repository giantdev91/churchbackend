import addExp from '~/db/users/monz/addExp';

/**
 * Update a user's profile
 * @path {PATCH} /users/monz/exp
 */
async function addExpRH(req, res) {
	const { level_up } = req.body;
	await addExp({
		userId: req.user.id,
		level_up
	});
	await res.sendStatus(200);
}

export default addExpRH;