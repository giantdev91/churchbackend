import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Unblocking a user.
 * @param {string} blockerId The id of the user who initiated the block.
 * @param {string} blockedId The id of the user at the receiving end of the
 * block.
 * @returns {void}
 */
function unblockUser({ blockerId, blockedId }) {
	validateIds(blockerId, blockedId);
	return db.query({
		text: `delete
		from block
		where blocker_id = $1
			and blocked_id = $2
`,
		values: [blockerId, blockedId],
	});
}

export default unblockUser;
