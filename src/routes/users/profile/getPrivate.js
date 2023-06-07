import { getUserPrivateProfile } from '~/utils/profile';

import { updateOnboardingAccountStatus } from '../../../utils/stripe';

/**
 * Get a user's private profile (includes information that only they should be
 * able to see)
 * @path {GET} /profile
 */
async function getUserPrivateProfileRH(req, res) {
	await updateOnboardingAccountStatus(req.user.id);
	await res.json(await getUserPrivateProfile(req.user.id));
}

export default getUserPrivateProfileRH;
