import PostConstants from '~/constants/Post';

/**
 * Retrieve the available categories for a post
 * @path {GET} /posts/categories
 * @response {string[]} categories - List of categories
 */
async function retrieveAvailableCategoriesRH(req, res) {
	await res.json(PostConstants.categories);
}

export default retrieveAvailableCategoriesRH;
