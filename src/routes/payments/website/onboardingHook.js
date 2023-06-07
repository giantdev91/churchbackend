/**
 * NOT IN USE: Update database and set stripe_customer_onboarding if charges_enabled is true
 * @path {POST} /stripeweb/onboardinghook
 * @body {object} type: account.updated - listening to hook
 * @response {object} message: successfully updated
 */

import { create } from '../../../utils/stripe';

async function createPayment(req, res) {
	
	const response = await create(req.body);
	res.status(200).json({ ...response });
}

export default createPayment;
