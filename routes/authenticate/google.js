const app = require('express')();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

app.route('/').get((req, res, next) => {
	passport.authenticate(
		'google',
		{
			scope: ['profile', 'email']
		},
		(error, user, message) => {}
	)(req, res, next);
});

app.route('/callback').get((req, res, next) => {
	passport.authenticate(
		'google',
		{
			successRedirect: '/profile',
			failureRedirect: '/login'
		},
		(error, user, message) => {
			const token = jwt.sign({ data: _.pick(user, ['_id', 'username']) }, process.env.SECRET, {});
			console.log(token);
			res.redirect(`${process.env.FRONTEND_HOST}/auth/google-callback?token=${token}`);
		}
	)(req, res, next);
});

module.exports = app;
