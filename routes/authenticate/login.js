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
		if (!req.body) {
			debug('Bad login request');
			return res.status(400).json({
				auth: false,
				message: 'Bad request'
			});
		}
		passport.authenticate('local-login', {}, (error, user, message) => {
			if (error) {
				debug(`Error logging user in: ${error}`);
				return res.status(401).json({
					auth: false,
					message: error
				});
			}
			const token = jwt.sign({ data: user }, secretKey, {});
			return res.json({
				auth: true,
				token
			});
		})(req, res, next);
	});

module.exports = app;
