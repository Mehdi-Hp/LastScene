const app = require('express')();
const passport = require('passport');
const debug = require('debug')('app:signupRoute');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const isEmail = require('isemail');
const _ = require('lodash');

app
	.route('/')
	.get((req, res, next) => {
		res.render('signup.ejs');
	})
	.post((req, res, next) => {
		debug(chalk.yellow.italic('Signing up user...'));
		debug(req.body);

		if (!isEmail.validate(req.body.email)) {
			return res.status(400).json({
				sucess: false,
				message: 'Please send an actual email'
			});
		}

		if (!req.body.email.length || !req.body.password.length || !req.body.username.length) {
			return res.status(400).json({
				sucess: false,
				message: 'Please send all required fields'
			});
		}

		passport.authenticate('local-signup', {}, (error, user, message) => {
			if (error) {
				return res.status(401).json({
					sucess: false,
					message: error
				});
			}
			passport.authenticate('local-login', {}, (error, user, message) => {
				if (error) {
					debug(`Error logging user in: ${error}`);
					return res.status(401).json({
						sucess: true,
						auth: false,
						message: error
					});
				}
				const token = jwt.sign({ data: _.pick(user, ['_id', 'usrname']) }, process.env.SECRET, {});
				return res.status(200).json({
					sucess: true,
					auth: true,
					token,
					redirectURL: '/'
				});
			})(req, res, next);
		})(req, res, next);
	});

module.exports = app;
