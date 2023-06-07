import getExp from '~/db/users/monz/getExp'

/**
 * Get a user's private profile (includes information that only they should be
 * able to see)
 * @path {GET} /monz/exp
 */
async function getExpRH(req, res) {
	await res.json(await getExp(req.params.userId));
}

export default getExpRH;