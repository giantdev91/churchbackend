import isEmailAvailable from '~/db/auth/isEmailAvailable';
import { validateEmail } from '~/utils/validation';

/**
 * Returns whether or not an email is available
 * @path {GET} /auth/is-email-available
 * @query {string} email - Email to check
 * @response {boolean} isAvailable - Whether or not the email is available
 */
async function isEmailAvailableRH(req, res) {
	validateEmail(req.query.email);
	await res.json(await isEmailAvailable({ email: req.query.email }));
}

export default isEmailAvailableRH;
