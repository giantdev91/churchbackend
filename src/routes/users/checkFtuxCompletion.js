import checkFtuxCompletion from '~/db/users/checkFtuxCompletion';

/**
 * Check if the user has completed FTUX (first-time user experience)
 * @response {boolean} hasCompletedFTUX - Whether or not the user has completed
 * FTUX
 */
async function checkFtuxCompletionRH(req, res) {
	const result = await checkFtuxCompletion({ userId: req.user.id });
	await res.json(result);
}

export default checkFtuxCompletionRH;
