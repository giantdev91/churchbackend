import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * @typedef PostMention
 * @property {string} options.userId - ID of the mentioned user
 * @property {string} username - Username of the mentioned user
 */

/**
 * Get the mentions of a post
 * @param {string} postId - The ID of the post
 * @returns {Promise<PostMention[]>} The list of mentions
 */
async function getPostMentions(postId) {
	validateIds(postId);
	const { rows } = await db.query({
		text: `select user_id, username from post_mention where post_id = $1;
`,
		values: [postId],
	});
	return rows.map((row) => ({
		userId: row.user_id,
		username: row.username,
	}));
}

/**
 * @typedef CommentMention
 * @property {string} options.userId - ID of the mentioned user
 * @property {string} username - Username of the mentioned user
 */

/**
 * Get the mentions of a comment
 * @param {string} commentId - The ID of the comment
 * @returns {Promise<CommentMention[]>} The list of mentions
 */
async function getCommentMentions(commentId) {
	validateIds(commentId);
	const { rows } = await db.query({
		text: `select user_id, username from comment_mention where comment_id = $1;`,
		values: [commentId],
	});
	return rows.map((row) => ({
		userId: row.user_id,
		username: row.username,
	}));
}

export { getCommentMentions, getPostMentions };
