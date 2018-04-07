const app = require('express')();
const debug = require('debug')('app:checkUser');
const chalk = require('chalk');
const User = require('../../models/user');

app.route('/').get((req, res, next) => {
	if (req.query.email) {
		const email = req.query.email.toLowerCase();
		debug(chalk.bold.dim(`Checking email existence [${email}]`));
		User.findOne({ 'authentication.local.email': email }, (error, user) => {
			if (error) {
				debug(chalk.bold.red(error));
				return res.status(500).json({
					error: true,
					message: 'Could not check email existence'
				});
			} else if (user) {
				return res.status(200).json({
					email: req.query.email,
					exist: true
				});
			}
			return res.status(200).json({
				email: req.query.email,
				exist: false
			});
		});
	}

	if (req.query.username) {
		const username = req.query.username.toLowerCase();
		debug(chalk.bold.dim(`Checking username existence [${username}]`));
		User.findOne({ username }, (error, user) => {
			if (error) {
				debug(chalk.bold.red(error));
				return res.status(500).json({
					error: true,
					message: 'Could not check username existence'
				});
			} else if (user) {
				return res.status(200).json({
					username: req.query.username,
					exist: true
				});
			}
			return res.status(200).json({
				email: req.query.email,
				exist: false,
				valid: true
			});
		});
	}
});

module.exports = app;
