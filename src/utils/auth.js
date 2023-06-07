import { expect } from 'chai';

import createRefreshToken from '~/db/auth/createRefreshToken';
import isAdmin from '~/db/users/isAdmin';
import jwt from 'jsonwebtoken'

// Creates a refresh token and a short-lived JWT
export async function createAuthTokens(userId) {
	const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: 60 * 1000000,
	});
	const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: 60 * 1000000,
	});
	return {
		refreshToken,
		accessToken
	};
}

// Checks if the requestor has sufficient permissions to perform tasks on
// Behalf of the user
export async function checkPermissions(requestorId, userId) {
	if (await isAdmin(requestorId)) {
		return true;
	}
	expect(
		requestorId,
		"You don't have sufficient permissions to perform this task."
	).to.equal(userId);
	return true;
}
