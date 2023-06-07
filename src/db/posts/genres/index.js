import db from '~/db';

/**
 * Gets the id and genres for poosts.
 * @returns {Promise<string>} The id and genre of the post.
 */
async function getGenres() {
	const {
		rows,
	} = await db.query({
		text: `select id, genre from post_genre`,
	});
	return rows;
}

export default getGenres;
