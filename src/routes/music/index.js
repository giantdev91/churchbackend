import express from 'express';
import multer from 'multer';

import byUser from './byUser';
import byUserIdRH from './byUserId';
import deleteMusic from './delete';
import getMusic from './get';
import searchMusic from './search';
import uploadMusic from './upload';
import searchVerified from './searchVerified';

import getMusicCommentCount from './comments/count';
import createMusicComment from './comments/create';
import deleteMusicComment from './comments/delete';
import getMusicComments from './comments/get';
import updateMusicComment from './comments/update';

const upload = multer({ dest: 'public/uploads/' });

const router = express.Router();

router.get('/', searchMusic);
router.get('/searchVerified', searchVerified);
router.get('/user', byUser);
router.get('/user/:userId', byUserIdRH);
router.post(
	'/',
	upload.fields([
		{ name: 'music', maxCount: 1 },
		{ name: 'artwork', maxCount: 1 },
	]),
	uploadMusic
);
router.get('/:musicId', getMusic);
router.delete('/:musicId', deleteMusic);

router.get('/:musicId/comments', getMusicComments);
router.get('/:musicId/comments/count', getMusicCommentCount);
router.post('/:musicId/comments', createMusicComment);
router.patch('/:musicId/comments/:commentId', updateMusicComment);
router.delete('/:musicId/comments/:commentId', deleteMusicComment);

export default router;
