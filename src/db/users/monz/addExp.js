import db from '~/db';
import { validateIds } from '~/utils/validation';

function addExp({
	userId,
	level_up
}) {
	validateIds(userId);
	return db.query({
		text: `update monz set
			exp = exp + $2
		where user_id = $1;
`,
		values: [userId, level_up],
	});
}

export default addExp;
