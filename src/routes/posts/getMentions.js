import { getCommentMentions, getPostMentions } from '~/db/posts/mentions/get';

/**
 * Get a post's mentions
 * @path {GET} /posts/:postId/mentions
 * @params {string} postId - The ID of the post
 * @response {string[]} usernames - List of usernames (mentions)
 */
async function getPostMentionsRH(req, res) {
	await res.json(await getPostMentions(req.params.postId));
}

/**
 * Get a comment's mentions
 * @path {GET} /comments/:commentId/mentions
 * @params {string} commentId - The ID of the comment
 * @response {string[]} usernames - List of usernames (mentions)
 */
async function getCommentMentionsRH(req, res) {
	await res.json(await getCommentMentions(req.params.commentId));
}

export { getCommentMentionsRH, getPostMentionsRH };
