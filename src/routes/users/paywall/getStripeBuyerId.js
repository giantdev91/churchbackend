import getStripeBuyerId from '~/db/payment/getStripeBuyerId';

async function getStripeBuyerIdRH(req, res) {

	await res.json(await getStripeBuyerId({ userId: req.query.userId}));
}

export default getStripeBuyerIdRH;
