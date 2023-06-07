import getCommentLikes from '~/db/posts/comments/likes/get';

/**
 * Get the users who've liked a comment
 * @path {GET} /posts/comments/:commentId/likes
 * @params {string} commentId - The ID of the comment
 * @query {number} limit - The maximum amount of comments to retrieve
 * @query {number} skip - The offset of comments to search for (used
 * for pagination)
 * @response {BaseUser[]} users - List of users
 */
async function getCommentLikesRH(req, res) {
	const { limit, skip } = req.query;
	const { rows } = await getCommentLikes({
		commentId: req.params.commentId,
		limit,
		skip,
	});
	await res.json(rows);
}

export default getCommentLikesRH;
