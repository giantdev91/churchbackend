import editMusicComment from '~/db/music/comments/edit';
import getCommenterId from '~/db/music/comments/getCommenterId';
import { checkPermissions } from '~/utils/auth';

/**
 * Edit/update an existing comment
 * @path {PATCH} /music/:musicId/comments/:commentId
 * @params {string} commentId - The ID of the comment to edit
 * @body {string} content - The new content for the comment
 */
async function editMusicCommentRH(req, res) {
	const { content } = req.body;
	const userId = await getCommenterId(req.params.commentId);
	await checkPermissions(req.user.id, userId);
	await editMusicComment({ content, commentId: req.params.commentId });
	await res.sendStatus(200);
}

export default editMusicCommentRH;
