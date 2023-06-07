import db from '~/db';
import getIdFromUsername from '~/db/users/getIdFromUsername';
import { validateIds } from '~/utils/validation';

/**
 * Create/associate mentions with a post
 * @param {object} postMentions - Parameters needed to create/associate
 * mentions with a post
 * @param {string} postMentions.postId - The ID of the post to associate
 * mentions with
 * @param {string[]} postMentions.mentions - An array of mentions
 * (usernames) to associate with the post
 * @returns {void}
 */
async function createPostMentions({ mentions, postId }) {
	validateIds(postId);
	await Promise.all(
		mentions.map(async (username) => {
			const userId = await getIdFromUsername(username);
			await db.query({
				text: `insert into post_mention (post_id, user_id, username)
			values ($1, $2, $3);
	`,
				values: [postId, userId, username],
			});
		})
	);
}

async function createCommentMentions({ mentions, id }) {
	validateIds(id);
	await Promise.all(
		mentions.map(async (username) => {
			const userId = await getIdFromUsername(username);
			await db.query({
				text: `insert into comment_mention (comment_id, user_id, username)
			values ($1, $2, $3);
	`,
				values: [id, userId, username],
			});
		})
	);
}

export { createCommentMentions, createPostMentions };
