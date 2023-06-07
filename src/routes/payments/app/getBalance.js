/**
 * get the current amount in users balance
 * @path {POST} /stripeapp/:stripeCustomerId/balance
 * @response gives an array containing customers balance information
 */

 import { balanceFromApp } from '../../../utils/stripe';

 async function getBalance(req, res) {
    
    const {stripeCustomerId} = req.params;
    await res.json(await balanceFromApp(stripeCustomerId));
 }
 
 export default getBalance;
 