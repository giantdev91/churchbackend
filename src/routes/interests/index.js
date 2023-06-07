import express from 'express';

import getInterests from './get';
import updateInterests from './update';

const router = express.Router();

router.get('/', getInterests);
router.post('/', updateInterests);

export default router;
