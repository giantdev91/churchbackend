/**
 * removes a subscription on stripes end
 * @path {POST} /stripeapp/cancelSubscription/
 * @response removes subscription from stripe account NOT muqo account that
 * us handled by unsubscribe.js
 */

 import { deleteFromApp } from '../../../utils/stripe';

 async function cancelSubscription(req, res) {
     const response = await deleteFromApp(req.body);
     res.status(200).json({ ...response });
 }
 
 export default cancelSubscription;
 