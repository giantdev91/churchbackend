import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Associate stripe buyer id with user
 * @param {string} stripe buyer id
 * @returns {void}
 */
async function updateUserStripeIdBuyer({ userId, stripeBuyerId }) {
	validateIds(userId);
	await db.query({
		text: `update app_user set
      stripe_buyer_id = coalesce($2, stripe_buyer_id)
      where id = $1;
  `,
		values: [userId, stripeBuyerId],
	});
}

export default updateUserStripeIdBuyer;
