import express from 'express';
import multer from 'multer';

import getBlockStatus from '~/routes/users/block/check';
import checkFtuxCompletion from '~/routes/users/checkFtuxCompletion';
import searchFollowers from '~/routes/users/follow/searchFollowers';
import searchFollowing from '~/routes/users/follow/searchFollowing';
import getPosts from '~/routes/users/getPosts';
import getPostsPrivate from '~/routes/users/getPostsPrivate';
import notifications from '~/routes/users/notifications';
import searchSubscribed from '~/routes/users/paywall/searchSubscribed';
import reportUser from '~/routes/users/report';
import reportMusic from '~/routes/users/reportMusic';
import reportPost from '~/routes/users/reportPost';
import suggestedUsers from '~/routes/users/suggested/getSuggestedUsers';

import updateUserAvatar from './avatar/update';
import blockUser from './block/create';
import unblockUser from './block/delete';
import changePassword from './changePassword';
import getFeed from './feed';
import getActorFollowersCount from './follow/actorFollowersCount';
import getActorFollowingCount from './follow/actorFollowingCount';
import followUser from './follow/create';
import unfollowUser from './follow/delete';
import getUserFollowersCount from './follow/followersCount';
import getUserFollowingCount from './follow/followingCount';
import getUserUploadedMusicRH from './getUserUploaded';
import unsubscribe from './paywall/delete';
import updateSubscribed from './paywall/update';
import getUserPrivateProfile from './profile/getPrivate';
import getUserPublicProfile from './profile/getPublic';
import updateUserProfile from './profile/update';
import searchUsers from './search';
import updateUserWallPhotoRH from './wall/update';

import getStripeBuyerIdRH from './paywall/getStripeBuyerId'

import addExpRH from './monz/addExp';
import getExpRH from './monz/getExp';
import resetExpRH from './monz/resetExp';

import addMonzRH from './monz/addMonz';
import getMonzRH from './monz/getMonz';
import createMonzRH from './monz/create';

import isVerifiedRH from './isVerified';
import searchVerifiedRH from './searchVerified';
import getVerified from './getVerified';
import setVerifiedRH from './setVerified';

import updateUsernameRH from './profile/changeUsername';

import isAdminRH from './isAdmin';
import getPendingRH from './getPending';
import getStripeRH from './getStripe';

import rejectVerification from './rejectVerification';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}`);
	},
});

const upload = multer({ storage });

router.get('/ftux', checkFtuxCompletion);

router.get('/search', searchUsers);
router.get('/feed', getFeed);

router.get('/notifications', notifications);

router.get('/profile', getUserPrivateProfile);
router.get('/:userId/profile', getUserPublicProfile);
router.patch('/', updateUserProfile);
router.patch('/change/:userId', updateUsernameRH);

router.get('/:userId/posts', getPosts);
router.get('/:userId/postsp/', getPostsPrivate);

// methods related to paywall,
router.patch('/paywall', updateSubscribed); // subscribes the user
router.patch('/paywall/remove', unsubscribe); // unsubscribes the user, note it uses patch not delete
router.get('/paywall/search', searchSubscribed); // searches for a subscribed user, used in badges
// Methods related to following users
router.post('/follow/:userId', followUser);
router.post('/unfollow/:userId', unfollowUser);

router.get('/followers', searchFollowers);
router.get('/followers/count', getActorFollowersCount);
router.get('/:userId/followers/count', getUserFollowersCount);

router.get('/following', searchFollowing);
router.get('/following/count', getActorFollowingCount);
router.get('/:userId/following/count', getUserFollowingCount);

router.get('/block/:userId', getBlockStatus);
router.post('/block/:userId', blockUser);
router.post('/unblock/:userId', unblockUser);

router.post('/avatar', upload.single('avatar'), updateUserAvatar);
router.post('/cover', upload.single('cover'), updateUserWallPhotoRH);

router.post('/report/:userId', reportUser);
router.post('/reportPost/:id', reportPost);
router.post('/reportMusic/:id', reportMusic);

router.post('/:userId/music', getUserUploadedMusicRH);

router.get('/suggested', suggestedUsers);

// Change password given the current password and the new one
router.post('/change-password', changePassword);

router.get('/buyerId', getStripeBuyerIdRH);

router.post('/monz/:userId/exp', addExpRH);
router.get('/monz/:userId/exp', getExpRH);
router.post('/monz/:userId/exp/reset', resetExpRH);

router.post('/monz/:userId/add', addMonzRH);
router.get('/monz/:userId/get', getMonzRH);
router.post('/monz/:userId', createMonzRH);

router.get('/:userId/isVerified', isVerifiedRH);
router.get('/searchVerified', searchVerifiedRH);
router.post('/getVerified/:userId', getVerified);

router.patch('/:userId/setVerified', setVerifiedRH);
router.patch('/:userId/reject', rejectVerification);

router.get('/:userId/isAdmin', isAdminRH);
router.get('/pending', getPendingRH);
router.get('/:userId/stripe', getStripeRH);

module.exports = router;
