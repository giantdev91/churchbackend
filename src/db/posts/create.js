import { expect } from 'chai';

import db from '~/db';
import addPostCategories from '~/db/posts/categories/create';
import createPostHashtags from '~/db/posts/hashtags/create';
import { createPostMentions } from '~/db/posts/mentions/create';
import { extractPostHashtags, extractPostMentions } from '~/utils/post';

const {
	validateIds,
	validatePost,
	validatePostCategories,
	validatePostGenre
} = require('~/utils/validation');

/**
 * Create a new post.
 * @param {string} userId The id of the user who created the post.
 * @param {string} title The title of the new post.
 * @param {string} description The description of the new post.
 * @param {boolean} isPhoto A boolean representing whether the post is a
 * photo or video.
 * @param {string?} musicId The id of the music if the post contains music
 * @param {string[]} categories An array of strings representing the
 * categories associated with the post
 * @returns {Promise<string>} The id of the newly created post.
 */
async function createPost({
	userId,
	title,
	description,
	isPhoto,
	musicId,
	categories,
	isPrivate,
	postType,
	genreId
}) {
	expect(isPhoto).to.be.a('boolean');
	validatePostCategories(categories);
	validatePost({ title, description });
	validateIds(userId);
	const thePostType = postType || 'REGULAR';

	if (musicId) {
		validateIds(musicId);
		await db.query({
			text: `update music
			set times_used = times_used + 1
			where id = $1;
	`,
			values: [musicId],
		});
	}
	const {
		rows: [{ id: postId }],
	} = await db.query({
		text: `
			insert into post (
				user_id,
				title,
				description,
				is_photo,
				is_private,
				is_processing,
				music_id,
				type
			)
			values ($1, $2, $3, $4, $5, $6,$7,$8)
			returning id;
	 `,
		values: [userId, title, description, isPhoto, isPrivate, !isPhoto, musicId,thePostType],
	});

	if(genreId) {
		validatePostGenre({id: genreId})
		await db.query({
			text: `update post
			set genre_id = $1
			where id = $2;
	`,
			values: [Number(genreId), postId],
		});
	}
	const hashtags = await extractPostHashtags({ description });
	await createPostHashtags({ hashtags, postId });
	const mentions = await extractPostMentions({ description });
	await createPostMentions({ mentions, postId });
	await addPostCategories({ postId, categories });
	return postId;
}

export default createPost;
