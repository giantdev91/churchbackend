import getSuggestedUsersByCategoryAndGenre from '~/db/users/suggested/getByCategoryAndGenre';

// Retrieve suggested users (based on a search parameter)
async function getSuggestedUsers(req, res) {
	const { category, genre } = req.query;
	await res.json(
		await getSuggestedUsersByCategoryAndGenre({ category, genre })
	);
}

export default getSuggestedUsers;
