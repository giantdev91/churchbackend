import isReferralAvailable from '~/db/auth/isReferralAvailable';
import { validateUsername } from '~/utils/validation';

/**
 * Returns whether or not a referral is available
 * @path {GET} /auth/is-referral-available
 * @query {string} username - Username to check
 * @response {boolean} isAvailable - Whether or not the username has been used
 */
async function isReferralAvailableRH(req, res) {
	validateUsername(req.query.username);
	await res.json(await isReferralAvailable({ username: req.query.username }));
}

export default isReferralAvailableRH;




