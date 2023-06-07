/**
 * get the current amount in users balance
 * @path {POST} /stripeapp/:stripeCustomerId/balance
 * @response gives an array containing customers balance information
 */

 import { createPayout } from '../../../utils/stripe';

 async function createPayoutFromApp(req, res) {
    console.log("step 1")
    const {stripeCustomerId} = req.params;
    await res.json(await createPayout(stripeCustomerId));
 }
 
 export default createPayoutFromApp;
 