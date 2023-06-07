import getGenres from "../../../db/posts/genres";


/**
 * Get all the genres for posts
 * @path {GET} /posts/genre
 * @response {{ genres: [Object] }} Object - id and genre for the posts
 */
async function getGenresRH(req, res) {
	const genres = await getGenres();
	await res.json({ genres });
}

export default getGenresRH;
