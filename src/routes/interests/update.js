import updateInterestsArtist from '~/db/interests/updateInterestsArtist';
import updateInterestsCategory from '~/db/interests/updateInterestsCategory';
import updateInterestsGenre from '~/db/interests/updateInterestsGenre';

/**
 * update a user's intertests
 * @path {POST} /interests
 * @body {string} userId - The user id
 * @body {string} interest - The interest type
 * @body {array} values - An array of interests
 */
async function updateInterests(req, res) {
	const { interest, values, userId: reqUserId } = req.body;

	const userId = reqUserId || req.user.id;

	if (interest === 'artist') {
		await updateInterestsArtist({ userId, artists: values });
	} else if (interest === 'category') {
		await updateInterestsCategory({ userId, categories: values });
	} else if (interest === 'genre') {
		await updateInterestsGenre({ userId, genres: values });
	}

	await res.sendStatus(200);
}

export default updateInterests;
