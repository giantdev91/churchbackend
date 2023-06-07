import isUsernameAvailable from '~/db/auth/isUsernameAvailable';
import { validateUsername } from '~/utils/validation';

/**
 * Checks if a username is available
 * @path {GET} /auth/is-username-available
 * @query {string} username - The username to check
 * @response {boolean} isAvailable - Whether or not the username is available
 */
async function checkIsUsernameAvailableRH(req, res) {
	validateUsername(req.query.username);
	await res.json(await isUsernameAvailable({ username: req.query.username }));
}

export default checkIsUsernameAvailableRH;
