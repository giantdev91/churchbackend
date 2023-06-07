import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Retrieve the hashtags associated with a post
 * @param {string} postId - The ID of the post
 * @returns {Promise<string[]>} The list of hashtags
 */
async function getPostHashtags(postId) {
	validateIds(postId);
	const { rows } = await db.query({
		text: `select hashtag from post_hashtag where post_id = $1;
`,
		values: [postId],
	});
	return rows.map((row) => row.hashtag);
}

export default getPostHashtags;
