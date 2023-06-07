import editPostComment from '~/db/posts/comments/edit';
import getCommenterId from '~/db/posts/comments/getCommenterId';
import { checkPermissions } from '~/utils/auth';

/**
 * Edit/update an existing comment
 * @path {PATCH} /posts/:postId/comments/:commentId
 * @params {string} commentId - The ID of the comment to edit
 * @body {string} content - The new content for the comment
 */
async function editPostCommentRH(req, res) {
	const { content } = req.body;
	const userId = await getCommenterId(req.params.commentId);
	await checkPermissions(req.user.id, userId);
	await editPostComment({ content, commentId: req.params.commentId });
	await res.sendStatus(200);
}

export default editPostCommentRH;
