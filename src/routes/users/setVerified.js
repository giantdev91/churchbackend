import setVerified from '~/db/users/setVerified';
import setVerifiedMusic from '~/db/users/setVerifiedMusic';
import setVerifiedPosts from '~/db/users/setVerifiedPosts'; 

/**
 * Update a user's profile
 * @path {PATCH} /users
 */
async function setVerifiedRH(req, res) {
	const { userId } = req.params;
	await setVerified({userId});
	await setVerifiedMusic({userId});
	await setVerifiedPosts({userId});
	await res.sendStatus(200);
}

export default setVerifiedRH;