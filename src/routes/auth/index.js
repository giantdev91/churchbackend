import express from 'express';

import checkEmailAvailability from '~/routes/auth/isEmailAvailable';
import checkReferralAvailability from '~/routes/auth/isReferralAvailable';
import checkUsernameAvailability from '~/routes/auth/isUsernameAvailable';
import checkIsUserSubscribed from '~/routes/auth/isUserSubscribed';
import checkPhoneAvailablilty from '~/routes/auth/isPhoneAvailable'

import loginRoute from './login';
import registerRoute from './register';
import resetPasswordRoute from './resetPassword';
import resetPasswordSetNewOne from './resetPasswordSetNewOne';
import tokenRoute from './token';
import deleteRoute from './delete';

const router = express.Router();

/* None of these routes use a JWT for authentication */

router.post('/register', registerRoute);
router.post('/login', loginRoute);
router.get('/is-username-available', checkUsernameAvailability);
router.get('/is-email-available', checkEmailAvailability);
router.get('/is-phone-available', checkPhoneAvailablilty);

router.get('/is-user-subscribed', checkIsUserSubscribed);

router.get('/is-referral-available', checkReferralAvailability); // added referral validator

// Generates a new access token and a new refresh token based on an old refresh token
router.post('/token', tokenRoute);

// Send the user an email to let them reset their password.
router.post('/reset-password', resetPasswordRoute);

// Set a new password for a user that reset theirs.
router.post('/reset-password-set-new-one', resetPasswordSetNewOne);

// Deletes an existing account
router.delete('/delete/:username', deleteRoute);

/*
router.post('/facebook', (req, res) => {

});

router.post('/google-plus', (req, res) => {

});

router.put('/update-username', (req, res) => {

});
 */

export default router;
