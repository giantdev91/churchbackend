import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Associate stripe customer id with user
 * @param {string} stripe customer id
 * @returns {void}
 */
async function updateUserStripeId({ userId, stripeCustomerId }) {
	validateIds(userId);
	await db.query({
		text: `update app_user set
      stripe_customer_id = coalesce($2, stripe_customer_id)
      where id = $1;
  `,
		values: [userId, stripeCustomerId],
	});
}

export default updateUserStripeId;
