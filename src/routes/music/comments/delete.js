import { expect } from 'chai';

import deleteMusicComment from '~/db/music/comments/delete';
import getCommenterId from '~/db/music/comments/getCommenterId';

/**
 * Delete a comment
 * @path {DELETE} /music/:musicId/comments/:commentId
 * @params {string} commentId - The ID of the comment to delete
 */
async function deleteMusicCommentRH(req, res) {
	// Verify if user is the one who posted the comment
	const userId = await getCommenterId(req.params.commentId);
	expect(userId, 'Comment not found.').to.exist;
	expect(userId, 'Only the owner of a comment can delete it').to.equal(
		req.user.id
	);
	await deleteMusicComment({ commentId: req.params.commentId });
	await res.sendStatus(200);
}

export default deleteMusicCommentRH;
