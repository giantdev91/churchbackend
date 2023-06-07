import db from '~/db';


/**
 * unsubscribed from user on MUQO END
 * @param {int} user_id is the id of the person to unsubscribed to
 * @param {int} actor_id is the id of the person who is unsubscribing
 * @returns {void}
 */
function unsubscribe({ userId, actorId }) {
    console.log("what are we working with here...", userId,actorId)
	
    return db.query({
		text: `UPDATE feature_flack SET subscribed_to = 
        array_remove(subscribed_to,$1) WHERE id = $2
        `,
		values: [userId,actorId],
	});
}

export default unsubscribe;
