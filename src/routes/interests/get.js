import getInterestsArtist from '~/db/interests/getInterestsArtist';
import getInterestsCategory from '~/db/interests/getInterestsCategory';
import getInterestsGenre from '~/db/interests/getInterestsGenre';

/**
 * A user's interest
 * @typedef UserInterest
 * @property {number} user_id - The ID of the user
 * @property {string} value - The interest value
 */

/**
 * Retrieves a user's intertests
 * @path {GET} /interests
 * @query {string} interest - the interest type
 * @response {UserInterest[]} List of interests
 */
async function getInterests(req, res) {
	const userId = req.user.id;

	let rows = {};
	if (req.query.interest === 'artist') {
		rows = await getInterestsArtist({ userId });
	} else if (req.query.interest === 'category') {
		rows = await getInterestsCategory({ userId });
	} else if (req.query.interest === 'genre') {
		rows = await getInterestsGenre({ userId });
	}

	await res.json(rows);
}

export default getInterests;
