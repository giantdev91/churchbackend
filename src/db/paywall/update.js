import db from '~/db';


/**
 * Subscribes a user to another user, uses an array
 * to track all the subscribers a user can have at once
 * @param {string} userId the id of the PERSON YOU WANT TO subscribe to****
 * @param {string?} actorId the id of the PERSON WHO IS SUBSCRIBING***
 * @returns {void}
 */
function updateSubscribed({userId, actorId}) {


	return db.query({
		text: `UPDATE feature_flack SET subscribed_to 
        = array_append(subscribed_to,$1) 
        WHERE id = $2;
`,
		values: [userId,actorId],
	});
}

export default updateSubscribed;
