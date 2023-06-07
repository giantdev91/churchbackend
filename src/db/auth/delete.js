import db from '~/db';

/**
 * Unlikes a comment.
 * @param {string} userId The id of the user who unliked a comment.
 * @param {string} commentId The id of the comment which the user unliked.
 * @returns {void}
 */
function deleteAccount({ username }) {
	return db.query({
		text: `delete from app_user where username = $1`,
		values: [username],
	});
}

export default deleteAccount;