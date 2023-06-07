import db from '~/db';

async function getIdFromUsername(username) {
	const { rows } = await db.query({
		text: `select id from app_user where username = $1;
`,
		values: [username],
	});
	return rows[0]?.id;
}

export default getIdFromUsername;
