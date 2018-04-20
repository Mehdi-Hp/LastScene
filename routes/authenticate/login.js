const app = require('express')();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:loginRoute');
const chalk = require('chalk');
const _ = require('lodash');

app.route('/').post((req, res, next) => {
	req.body.email = req.body.email.trim();
	req.body.password = req.body.password.trim();
	if (!req.body || !req.body.email.length || !req.body.password.length) {
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
		const token = jwt.sign({ data: _.pick(user, ['_id', 'username']) }, process.env.SECRET, {});
		req.logIn(user, (error) => {
			if (error) {
				return res.status(401).json({
					auth: false,
					message: error
				});
			}
			debug(chalk.green(`User [${user.username}] logged in`));
			return res.status(200).json({
				auth: true,
				token,
				redirectURL: '/'
			});
		});
	})(req, res, next);
});

module.exports = app;
