import camelcaseKeys from 'camelcase-keys';

import db from '~/db';
import { validateIds } from '~/utils/validation';

async function getMonz(userId) {
	validateIds(userId);
	const { rows } = await db.query({
		text: `select 
		*
		from monz
		where user_id = $1;
`,
		values: [userId],
	});

	return camelcaseKeys(rows);
}

export default getMonz;