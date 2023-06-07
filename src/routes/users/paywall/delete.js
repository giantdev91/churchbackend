import unsubscribe from '~/db/paywall/unsubscribe';


/**
 * unsubscribe from a user
 * @path paywall/delete/
 * @params {string} postId - The ID of the post to delete
 */
async function unsubscribeRH(req, res) {

	const {actorId, userId} = req.body;
   

	await unsubscribe({ userId,actorId});
	await res.sendStatus(200);
}

export default unsubscribeRH;
