import searchUserSubscribed from '~/db/paywall/searchSubscribed';


/**
 * Search for a users subscribed to list 
 * @path {GET} /paywall/search
 * @query {string} query - username on subscribed list to search for
 * @response {BaseUser[]} users - List of users that the userid has subscribed to
 */
async function searchUserSubscribedRH(req, res) {
	const { id } = req.query;

	const rows = await searchUserSubscribed({
		userId: id,
	});

	await res.json(rows);
}

export default searchUserSubscribedRH;
