import resetExp from '~/db/users/monz/resetExp'

/**
 * Get a user's private profile (includes information that only they should be
 * able to see)
 * @path {GET} /monz/exp
 */
async function resetExpRH(req, res) {
	await res.json(await resetExp(req.params.userId));
}

export default resetExpRH;