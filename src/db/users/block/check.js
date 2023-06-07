import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Checks if a certain user has blocked another.
 * @param {string} blockerId The id of the user who initiated the block.
 * @param {string} blockedId The id of the user at the receiving end of the
 * block.
 * @returns {Promise<boolean>} A boolean representing whether or not the
 * specified user (blockerId) has blocked the other specified user (blockedId)
 */
async function isUserBlocked({ blockerId, blockedId }) {
	validateIds(blockerId, blockedId);
	const {
		rows: [{ count }],
	} = await db.query({
		text: `select count(*)
		from block
		where blocker_id = $1
			and blocked_id = $2
`,
		values: [blockerId, blockedId],
	});
	return count > 0;
}

export default isUserBlocked;
