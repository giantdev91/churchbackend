import getMonz from '~/db/users/monz/getMonz'

/**
 * Get a user's private profile (includes information that only they should be
 * able to see)
 * @path {GET} /monz/exp
 */
async function getMonzRH(req, res) {
	await res.json(await getMonz(req.params.userId));
}

export default getMonzRH;