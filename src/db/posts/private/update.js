import db from '~/db';
import { validateIds} from '~/utils/validation';

/**
 * makes post private.
 * @param {string} postId The id of the post to make private.
 * @returns {void}
 */
function updatePrivate({postId}) {
   
	

	return db.query({
		text: `UPDATE post SET is_private 
        = true WHERE 
        WHERE id = $1;
`,
		values: [postId],
	});
}

export default updatePrivate;
