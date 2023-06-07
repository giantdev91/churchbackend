import addMonz from '~/db/users/monz/addMonz';

/**
 * Update a user's profile
 * @path {PATCH} /users
 */
async function addMonzRH(req, res) {
	const { monz } = req.body;
	await addMonz({
		userId: req.params.userId,
		monz
	});
	await res.sendStatus(200);
}

export default addMonzRH;