import express from 'express';

import createOnboardingLink from './onboading';
import createPayment from './pay';
import cancelSubscription from './cancelSubscription';
import getBalance from'./getBalance'
import createPayoutFromApp from'./createPayoutFromApp'

const router = express.Router();

router.post('/cancelSubscription', cancelSubscription)//removes subscriptions STRIPE SIDE NOT MUQO SIDE
router.post('/:stripeCustomerId/createPayoutFromApp', createPayoutFromApp)//removes subscriptions STRIPE SIDE NOT MUQO SIDE
router.post('/onboarding', createOnboardingLink);
router.post('/create', createPayment);
router.get('/:stripeCustomerId/balance', getBalance);

export default router;
