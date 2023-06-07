import db from '~/db';

/**
 * Associate post categories with a post
 * @param {string} postId The id of the post for which you would like to
 * associated these categories
 * @param {string[]} categories An array of strings representing the
 * categories with which you would like to associate the post
 * @returns {void}
 */
async function addPostCategories({ postId, categories }) {
	await Promise.all(
		categories.map((category) => {
			return db.query({
				text: `insert into post_category (post_id, category)
			values ($1, $2);
	`,
				values: [postId, category],
			});
		})
	);
}

export default addPostCategories;
