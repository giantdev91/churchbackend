import { expect } from 'chai';
import validator from 'email-validator';

import MaxQueryCounts from '~/constants/MaxQueryCounts';
import NotificationConstants from '~/constants/Notification';
import PostConstants from '~/constants/Post';

function validatePost({ title, description }) {
	expect(title, 'Post title should be a string').to.be.a('string');
	expect(description, 'Post description should be a string').to.be.a('string');
	// expect(title.length, 'Title must not be empty.').to.be.above(0);
	// expect(description.length, 'Description must not be empty').to.be.above(0);
}

function validatePassword(password) {
	expect(password, 'Password must a string').to.be.a('string');
	expect(
		password.length,
		'Password must be at least 8 characters'
	).to.be.at.least(8);
}

function validatePostComment({ content }) {
	expect(content, 'Post comment should be a string').to.be.a('string');
	expect(
		content.length,
		'A comment may not exceed 1000 characters.'
	).to.be.at.most(1000);
}

function validateIds(...ids) {
	ids.forEach(
		(id) =>
			expect(
				typeof id === 'number' || typeof id === 'string',
				'ID must be a number or a string.'
			).to.be.true
	);
}

function validatePostGenre({ id}) {
	expect(
		typeof id === 'number' || typeof id === 'string',
		'ID must be a number or a string.'
	).to.be.true
}

function validateProfile({
	displayName,
	bio,
	phoneNumber,
	country,
	city,
	genres,
	categories,
	artists,
}) {
	if (displayName) {
		expect(displayName, 'Display name should be a string').to.be.a('string');
		expect(
			displayName.length,
			'Your display name must not be blank and can have at most 50 characters.'
		)
			.to.be.above(0)
			.and.at.most(50);
	}

	if (bio) {
		expect(bio, 'Bio should be a string').to.be.a('string');
		expect(
			bio.length,
			'Your bio must not exceed 1000 characters.'
		).to.be.at.most(1000);
	}

	if (phoneNumber) {
		expect(phoneNumber, 'Phone number should be a string').to.be.a('string');
		expect(
			phoneNumber.length,
			'Your phone number should not exceed 15 digits.'
		).to.be.at.most(15);
	}

	if (country) {
		expect(country, 'Country should be a string').to.be.a('string');
		expect(
			country.length,
			'Your country should not exceed 90 characters.'
		).to.be.at.most(90);
	}

	if (city) {
		expect(city, 'City should be a string').to.be.a('string');
		expect(
			city.length,
			'Your city should not exceed 189 characters.'
		).to.be.at.most(189);
	}

	if (genres) {
		expect(genres, 'Type must be a array.').to.be.a('array');
	}

	if (categories) {
		expect(categories, 'Type must be a array.').to.be.a('array');
	}

	if (artists) {
		expect(artists, 'Type must be a array.').to.be.a('array');
	}
}

function validateSkip(skip) {
	expect(skip, 'Skip must be a number.').to.be.a('number');
	expect(skip % 1, 'Skip must be an integer.').to.equal(0);
	expect(skip, 'Skip must be a non-negative integer.').to.be.at.least(0).and
		.finite;
}

function validateLimit(limit, type) {
	expect(type, 'Limit type should be a valid limit type').to.be.oneOf(
		Object.keys(MaxQueryCounts)
	);
	expect(
		limit,
		`Limit must be at least 1 and no more than ${MaxQueryCounts[type]}`
	)
		.to.be.above(0)
		.and.at.most(MaxQueryCounts[type]);
}

function validateHashtag(hashtag) {
	expect(hashtag, 'Hashtag must be a string.').to.be.a('string');
	expect(
		hashtag.length,
		'Hashtag should not be empty and be at most 128 characters'
	)
		.to.be.above(0)
		.and.at.most(128);
}

function validateUsername(username) {
	expect(username, 'Username must be a string.').to.be.a('string');
	expect(/[a-zA-Z0-9_]+/.test(username), 'Invalid username.').to.be.true;
}

function validateEmail(email) {
	expect(email, 'Email must be a string.').to.be.a('string');
	expect(validator.validate(email), 'Invalid email.').to.be.true;
}

function validatePhone(phone) {
	expect(phone, 'Phone must be a string.').to.be.a('string');
	expect(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/m.test(phone), 'Invalid Phone.').to.be.true;
}

function validateMusic({ title, artistId, artistName }) {
	expect(title, 'Music title should be a string.').to.be.a('string');
	expect(
		title.length,
		'Music title should not be empty and should not exceed 200 characters'
	)
		.to.be.above(0)
		.and.below(200);
	// Only one of the two should exist
	expect(
		!!artistId !== !!artistName,
		'Only one of artistId or artistName should be provided'
	).to.be.true;

	if (artistId) {
		validateIds(artistId);
	} else {
		expect(artistName, 'Expected artist name to be a string.').to.be.a(
			'string'
		);
		expect(
			artistName.length,
			'Artist name must not be empty and should not exceed 100 characters'
		)
			.to.be.above(0)
			.and.below(100);
	}
}

function validatePostCategories(...categories) {
	categories.flat(Infinity).forEach((category) => {
		expect(PostConstants.categories.includes(category), 'Invalid category.').to
			.be.true;
	});
}

function validateNotificationType(type) {
	expect(type, 'Type must be a string.').to.be.a('string');
	expect(NotificationConstants.types.includes(type), 'Invalid type.').to.be
		.true;
}

function validateArray(type) {
	expect(type, 'Type must be a array.').to.be.a('array');
}

export {
	validateArray,
	validateEmail,
	validateHashtag,
	validateIds,
	validateLimit,
	validateMusic,
	validateNotificationType,
	validatePassword,
	validatePost,
	validatePostCategories,
	validatePostComment,
	validatePostGenre,
	validateProfile,
	validateSkip,
	validateUsername,
	validatePhone};
