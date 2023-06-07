import getStripeIdEmail from '~/db/payment/getStripeIdEmail';

async function getStripeRH(req, res) {
	const { userId } = req.params;
	await res.json(await getStripeIdEmail({ userId }));
}

export default getStripeRH;