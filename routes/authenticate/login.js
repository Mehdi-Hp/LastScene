const app = require('express')();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const debug = require('debug')('development');
const secretKey = require('../../config/secretKey');

app.route('/')
	.get((req, res, next) => {
		res.render('login.ejs');
	})
	.post((req, res, next) => {
		debug('LOGIN ROUTE...');
		passport.authenticate('local-login', {}, (error, user, message) => {
			if (error) {
				res.status(401).json({
					auth: false,
					message: error
				});
			} else {
				const token = jwt.sign({ data: user }, secretKey, { expiresIn: '1d' });
				res.json({
					auth: true,
					message,
					token
				});
			}
		})(req, res, next);
	});

module.exports = app;
