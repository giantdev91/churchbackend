import db from '~/db';
import { validateIds } from '~/utils/validation';

function resetExp({
	userId
}) {
	validateIds(userId);
	return db.query({
		text: `update monz set
            exp = exp - 500
        where user_id = $1;
`,
		values: [userId],
	});
}

export default resetExp;