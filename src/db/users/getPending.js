import camelcaseKeys from 'camelcase-keys';
import db from '~/db/index';

async function getPending() {
	const { rows } = await db.query({
		text: `
		select id, 
        username, 
        email,
        socials
		from app_user
		where pending_verification = true
		order by id;`
	});

	return camelcaseKeys(rows);
}

export default getPending;