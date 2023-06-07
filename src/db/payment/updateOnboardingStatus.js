import db from '~/db';
import { validateIds } from '~/utils/validation';

/**
 * Update stripe_customer_onboarding is charges_enabled is true
 * @param {string} stripe customer id
 * @returns {void}
 */
async function updateOnboardingStatus({ userId }) {
	validateIds(userId);
	await db.query({
		text: `update app_user set
		stripe_customer_onboarding = coalesce(true, stripe_customer_onboarding)
      where id = $1;
  `,
		values: [userId],
	});
}

export default updateOnboardingStatus;
