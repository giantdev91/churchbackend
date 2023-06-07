import db from '~/db';
// import { createCommentMentions } from '~/db/music/mentions/create';
// import { extractPostMentions } from '~/utils/post';
import { validateIds, validatePostComment } from '~/utils/validation';

/**
 * Creates a post comment and associates it with a post and a user
 * @param {string} musicId The id of the post with which you would like to
 * associate the comment
 * @param userId The id of the user with whom you would like to associate
 * the comment
 * @param {string} content The content of the comment
 * @returns {Promise<string>} Returns the id of the newly added comment
 */
async function createMusicComment({ musicId, userId, content }) {
	validateIds(musicId, userId);
	validatePostComment({ content });
	const {
		rows: [{ id }],
	} = await db.query({
		text: `insert into music_comment (music_id, user_id, content)
    values ($1, $2, $3)
    returning id;
 `,
		values: [musicId, userId, content],
	});

	// const mentions = await extractPostMentions({ description: content });
	// await createCommentMentions({ mentions, id });

	return id;
}

export default createMusicComment;
