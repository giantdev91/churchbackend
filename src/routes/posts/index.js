import express from 'express';
import multer from 'multer';

import createPhotoPost from '~/routes/posts/createPhoto';
import createVideoPost from '~/routes/posts/createVideo';
import searchPosts from '~/routes/posts/searchByHashtag';

import getPostCommentCount from './comments/count';
import createPostComment from './comments/create';
import deletePostComment from './comments/delete';
import getPostComments from './comments/get';
import getCommentLikesCount from './comments/likes/count';
import createCommentLike from './comments/likes/create';
import deleteCommentLike from './comments/likes/delete';
import getCommentLikes from './comments/likes/get';
import verifyCommentLike from './comments/likes/verify';
import updatePostComment from './comments/update';
import getPostsCount from './count';
import deletePost from './delete';
import getGenresRH from './genres';
import getPostByIdRH from './getById';
import getCategories from './getCategories';
import getPostHashtags from './getHashtags';
import { getCommentMentionsRH, getPostMentionsRH } from './getMentions';
import getTrending from './getTrending';
import getPostLikesCount from './likes/count';
import createPostLike from './likes/create';
import deletePostLike from './likes/delete';
import getPostLikes from './likes/get';
import verifyPostLike from './likes/verify';
import updatePost from './update';
import getVerified from './getVerified';


/**
 * Uploading photo to local disk and then remove it starts
 */
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}`);
	},
});

const photoUpload = multer({ storage });

/**
 * Uploading photo to local disk and then remove it ends
 */

const upload = multer({ dest: 'public/uploads/' });

const router = express.Router();
router.get('/genres', getGenresRH);
router.get('/search', searchPosts);

// Trending without passing a category automatically returns the most
// trending posts out of all posts (not based on category)
router.get('/trending', getTrending);
router.get('/verified', getVerified);

router.post('/photo', photoUpload.single('photo'), createPhotoPost);
router.post('/video', upload.single('video'), createVideoPost);
router.get('/count', getPostsCount);
router.get('/categories', getCategories);

router.get('/:postId', getPostByIdRH);
router.patch('/:postId', updatePost);
router.delete('/:postId', deletePost);

router.get('/:postId/comments', getPostComments);
router.get('/:postId/comments/count', getPostCommentCount);
router.post('/:postId/comments', createPostComment);
router.patch('/:postId/comments/:commentId', updatePostComment);
router.delete('/:postId/comments/:commentId', deletePostComment);

router.get('/:postId/likes', getPostLikes);
router.get('/:postId/likes/count', getPostLikesCount);
router.get('/:postId/likes/verify', verifyPostLike);
router.post('/:postId/likes', createPostLike);
router.delete('/:postId/likes', deletePostLike);

router.get('/comments/:commentId/likes', getCommentLikes);
router.get('/comments/:commentId/likes/count', getCommentLikesCount);
router.get('/comments/:commentId/likes/verify', verifyCommentLike);
router.post('/comments/:commentId/likes', createCommentLike);
router.delete('/comments/:commentId/likes', deleteCommentLike);
router.get('/comments/:commentId/mentions', getCommentMentionsRH);

router.get('/:postId/mentions', getPostMentionsRH);
router.get('/:postId/hashtags', getPostHashtags);



export default router;
