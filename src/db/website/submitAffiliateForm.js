import db from '~/db';

/**
 * Create a submission of an affiliate form in the database.
 * @param {object} formData All the data for the affiliate form.
 * @returns {void}
 */
async function submitAffiliateForm({ formData }) {
	const {
		firstName,
		lastName,
		email,
		occupation,
		age,
		address,
		city,
		province,
		country,
		postalCode,
		phone,
		profession,
		reasoning,
		workedAsPromotional,
		usedApp,
		knowledgeOfApp,
		beenPartOfGroup,
		timesPerWeekDanced,
		favoriteMusicGenre,
		favoriteSocialMedia,
		socialMedia,
		listOfSocialMediaVerifications,
		specialTalents,
	} = formData;

	await db.query({
		text: `insert into affiliate_request (
			first_name,
			last_name,
			email,
			occupation,
			age,
			address,
			city,
			province,
			country,
			postal_code,
			phone,
			profession,
			reasoning,
			worked_as_promotional,
			used_app,
			knowledge_of_app,
			been_part_of_group,
			times_per_week_danced,
			favorite_movie_genre,
			favorite_social_media,
			social_media,
			list_of_social_media_verifications,
			special_talents
		)
		values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
`,
		values: [
			firstName,
			lastName,
			email,
			occupation,
			age,
			address,
			city,
			province,
			country,
			postalCode,
			phone,
			profession,
			reasoning,
			workedAsPromotional,
			usedApp,
			knowledgeOfApp,
			beenPartOfGroup,
			timesPerWeekDanced,
			favoriteMusicGenre,
			favoriteSocialMedia,
			socialMedia,
			listOfSocialMediaVerifications,
			specialTalents,
		],
	});
}

export default submitAffiliateForm;
