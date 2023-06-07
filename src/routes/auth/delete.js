import { validate } from 'email-validator';
import deleteAccount from '~/db/auth/delete';

/**
 * Delete a comment
 * @path {DELETE} /delete/:email
 * @params {string} email - The email of the account to delete
 */
async function deleteAccountRH(req, res) {
	//validate(req.params.email)
	await deleteAccount({ username: req.params.username });
	await res.sendStatus(200);
}

export default deleteAccountRH;