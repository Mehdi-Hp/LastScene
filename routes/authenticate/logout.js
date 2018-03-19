const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');

app.route('/')
	.get((req, res, next) => {
		debug(chalk.underline('Logging out the user...'));
		req.logout();
		res.redirect('/login')
	});

module.exports = app;
