import getUserUploadedMusic from '~/db/users/getUserUploadedMusic';

/**
 * Retrieves music with a specific ID
 * @path {GET} /users/:userId/music
 * @params {string} options.userId - The ID of the user whose music to retrieve
 * @response {Music} music - The music result
 */
async function getUserUploadedMusicRH(req, res) {
	await res.json(
		await getUserUploadedMusic({
			userId: req.params.userId,
			limit: req.query.limit,
			skip: req.query.skip,
		})
	);
}

export default getUserUploadedMusicRH;
