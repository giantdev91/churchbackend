import getPending from '~/db/users/getPending'

async function getPendingRH(req, res) {
	await res.json(await getPending());
}

export default getPendingRH;