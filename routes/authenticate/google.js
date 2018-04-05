const app = require('express')();
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
			const token = jwt.sign({ data: user }, process.env.SECRET, {});
			console.log(token);
			res.redirect(`http://localhost:8080/auth/google-callback?token=${token}`);
		}
	)(req, res, next);
});

module.exports = app;
