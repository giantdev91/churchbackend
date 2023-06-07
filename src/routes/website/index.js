import express from 'express';

import submitAffiliateForm from './submitAffiliateForm';

const router = express.Router();

router.post('/affiliate', submitAffiliateForm);

export default router;
