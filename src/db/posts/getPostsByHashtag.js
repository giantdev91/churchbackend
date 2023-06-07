import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import getPostById from '~/db/posts/getPostById';
import { validateHashtag } from '~/utils/validation';

/**
 * Searching posts by a certain hashtag.
 * @param {string} hashtag The hashtag for which posts are searched.
 * @returns {Promise<Array.<{ postId: string }>>} The IDs of the retrieved
 * posts.
 */
async function getPostsByHashtag({ hashtag }) {
	validateHashtag(hashtag);
	const { rows } = await db.query({
		text: `select post_id
		from post_hashtag
		where hashtag = $1;
`,
		values: [hashtag],
	});
	// TODO: Avoid N+1 problem
	return Promise.all(
		camelcaseKeys(rows).map(async (post) => {
			return getPostById(post.postId);
		})
	);
}

export default getPostsByHashtag;
