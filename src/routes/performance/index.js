import express from 'express';

import createRequestPost from './createRequest';
import getPerformancePost from './getPerformancePost';
import { getRequests, getRequestsByRequestedForUserId } from './getRequests';
import updateRequestStatus from './updateRequest';

const router = express.Router();

router.get('/requests', getRequests);
router.get('/requests/user/:userId', getRequestsByRequestedForUserId);
router.post('/request', createRequestPost);
router.put('/request/:requestId', updateRequestStatus);
router.get('/:userId/postPerformance', getPerformancePost);

export default router;
