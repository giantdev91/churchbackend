import express from 'express';

import getCountryList from './getCountryList';

const router = express.Router();

router.get('/country-list/get', getCountryList);

export default router;
