/**
 * Create a payment
 * @path {POST} /stripeweb/create
 * @body {object} paymentMethod - Payment Method generated on the frontend
 * @response {object} invoice_pdf - invoice pdf or receipt_url - receipt url if product is not a subcription
 */

import { create } from '../../../utils/stripe';

async function createPayment(req, res) {

	const response = await create(req.body);
	res.status(200).json({ ...response });
}

export default createPayment;
