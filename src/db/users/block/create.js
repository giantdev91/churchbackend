import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Blocks a user.
 * @param {string} blockerId The id of the user who initiated the block.
 * @param blockedId The id of the user at the receiving end of the block.
 * @returns {void}
 */
function blockUser({ blockerId, blockedId }) {
	validateIds(blockerId, blockedId);
	return db.query({
		text: `insert into block (blocker_id, blocked_id)
		values ($1, $2);
`,
		values: [blockerId, blockedId],
	});
}

export default blockUser;
