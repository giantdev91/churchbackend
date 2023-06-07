import deletePost from '~/db/posts/delete';
import getPosterId from '~/db/posts/getPosterId';
import { checkPermissions } from '~/utils/auth';

/**
 * Delete a post
 * @path {DELETE} /posts/:postId
 * @params {string} postId - The ID of the post to delete
 */
async function deletePostRH(req, res) {
	// Only people who've created the post can delete the post
	const userId = await getPosterId({ postId: req.params.postId });
	await checkPermissions(req.user.id, userId);
	await deletePost({ postId: req.params.postId });
	await res.sendStatus(200);
}

export default deletePostRH;
