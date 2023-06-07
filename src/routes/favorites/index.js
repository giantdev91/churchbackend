import express from 'express';

import addFavMusic from './addfav/music';
import addFavUser from './addfav/user';
import getFavMusic from './getfav/music';
import getFavMusicByUserId from './getfav/musicByUserId';
import getFavUser from './getfav/user';
import delFavMusic from './removefav/music';
import delFavUser from './removefav/user';

const router = express.Router();

router.get('/music/', getFavMusic);
router.get('/:userId/music', getFavMusicByUserId);
router.get('/user/:userId', getFavUser);
router.post('/music/:musicId', addFavMusic);
router.post('/user', addFavUser);
router.delete('/music/:musicId', delFavMusic);
router.delete('/user', delFavUser);

export default router;
