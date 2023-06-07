import { expect } from 'chai';

import deletePostComment from '~/db/posts/comments/delete';
import getCommenterId from '~/db/posts/comments/getCommenterId';

/**
 * Delete a comment
 * @path {DELETE} /posts/:postId/comments/:commentId
 * @params {string} commentId - The ID of the comment to delete
 */
async function deletePostCommentRH(req, res) {
	// Verify if user is the one who posted the comment
	const userId = await getCommenterId(req.params.commentId);
	expect(userId, 'Comment not found.').to.exist;
	expect(userId, 'Only the owner of a comment can delete it').to.equal(
		req.user.id
	);
	await deletePostComment({ commentId: req.params.commentId });
	await res.sendStatus(200);
}

export default deletePostCommentRH;
