import db from '~/db';
import { validateHashtag, validateIds } from '~/utils/validation';

/**
 * Creates and associates a hashtag with a certain post
 * @param {string} hashtag The value of the hashtag (unprefixed with #)
 * @param {string} postId The id of the post for which you would like to
 * associate the hashtag with
 * @returns {void}
 */
async function createPostHashtags({ hashtags, postId }) {
	validateIds(postId);
	await Promise.all(
		hashtags.map(async (hashtag) => {
			validateHashtag(hashtag);
			await db.query({
				text: `insert into post_hashtag (post_id, hashtag)
			values ($1, $2);
	`,
				values: [postId, hashtag],
			});
		})
	);
}

export default createPostHashtags;
