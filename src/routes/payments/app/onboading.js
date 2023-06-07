/**
 * Create onboarding link
 * @path {POST} /stripe/onboarding/
 * @response {object}  - onboarding_link: link
 */

import { createOnboardingLink } from '../../../utils/stripe';

async function getOnboardingLink(req, res) {
	const response = await createOnboardingLink({ id: req.user.id });
	if (response.accountLink) {
		return res.status(200).json({ onboarding_link: response.accountLink.url });
	}
	return res.status(200).json({ chargesEnabled: true });
}

export default getOnboardingLink;
