import db from '~/db';
import { validateIds } from '~/utils/validation';

function createMonz({
	userId
}) {
	validateIds(userId);
// 	return db.query({
// 		text:  `insert into monz
//         (user_id)
//         values ($1)
// `,
// 		values: [userId],
// 	});
}

export default createMonz;