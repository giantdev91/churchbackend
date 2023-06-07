import chai from 'chai';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { expressjwt as jwt } from 'express-jwt';
import admin from 'firebase-admin';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';

import authRouter from '~/routes/auth';
import favoriteRouter from '~/routes/favorites';
import interestsRouter from '~/routes/interests';
import musicRouter from '~/routes/music';
import stripeAppRouter from '~/routes/payments/app';
import stripeWebsiteRouter from '~/routes/payments/website';
import performanceRouter from '~/routes/performance';
import postsRouter from '~/routes/posts';
import usersRouter from '~/routes/users';
import utilsRouter from '~/routes/utils';
import websiteRouter from '~/routes/website';

const { AssertionError } = chai;

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});

chai.config.includeStack = false;

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

function logResponseBody(req, res, next) {
	const oldJson = res.json;

	res.json = async (...args) => {
		console.log(args);
		return oldJson.apply(res, args);
	};

	next();
}
app.get('/muqo', (req, res) => {
	res.send('Welcome to MUQO Backend');
});
app.use(logResponseBody);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

/*
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
	done(null, jwtPayload.,);
}));
 */

app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		requestProperty: 'user',
		algorithms: ["HS256"],
		getToken: function fromHeaderOrQuerystring(req) {
			console.log(req.headers)

      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        const token = req.headers.authorization.split(" ")[1];
				console.log('token', token)
				return token
      } else if (req.query && req.query.token) {
        return req.query.token;
      }

			console.log('No token provided')
      return null;
    },
	}).unless({
		path: [/\/auth/, /\/uploads/, /\/website/, /\/utils/, /\/stripeweb/],
	})
);

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/music', musicRouter);
app.use('/auth', authRouter);
app.use('/website', websiteRouter);
app.use('/utils', utilsRouter);
app.use('/stripeapp', stripeAppRouter);
app.use('/stripeweb', cors(), stripeWebsiteRouter);
app.use('/favorites', favoriteRouter);
app.use('/performance', performanceRouter);
app.use('/interests', interestsRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	if (req.originalUrl.includes('uploads')) {
		return res.sendStatus(404);
	}
	return next(createError(404));
});

// Production error handler
const HTTP_SERVER_ERROR = 500;
// eslint-disable-next-line max-params
app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof AssertionError) {
		return res.status(422).json({
			message: err.message.split(':')[0],
		});
	}
	return res.status(err.status || HTTP_SERVER_ERROR).send(err);
});

export default app;
