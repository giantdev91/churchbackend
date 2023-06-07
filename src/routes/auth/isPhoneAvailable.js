import isPhoneAvailable from '~/db/auth/isPhoneAvailable';
import { validatePhone } from '~/utils/validation';

/**
 * Returns whether or not an phone is available
 * @path {GET} /auth/is-phone-available
 * @query {string} phone_number - phone to check
 * @response {boolean} isAvailable - Whether or not the phone is available
 */
async function isPhoneAvailableRH(req, res) {
	validatePhone(req.query.phone_number);
	await res.json(await isPhoneAvailable({ email: req.query.phone_number }));
}

export default isPhoneAvailableRH;
