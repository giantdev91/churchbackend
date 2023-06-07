import express from 'express';

import createPayment from './pay';

const router = express.Router();

router.post('/create', createPayment);

export default router;
