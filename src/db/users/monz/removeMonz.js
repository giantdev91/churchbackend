import db from '~/db';
import { validateIds } from '~/utils/validation';

function removeMonz({
	userId,
	monz
}) {
	validateIds(userId);
	return db.query({
		text: `update monz set
			monz = monz - $2
		where user_id = $1;
`,
		values: [userId, monz],
	});
}

export default removeMonz;