const app = require('express')();
const debug = require('debug')('app:logoutRoute');
const chalk = require('chalk');

app.route('/').post((req, res, next) => {
	debug(chalk.underline('Logging out the user...'));
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		req.logout();
		res.status(200).send({
			logout: true,
			message: 'Successfully logged out',
			redirect: '/login'
		});
	} else {
		res.status(400).send({
			logout: true,
			message: 'Already logged out',
			redirect: '/login'
		});
	}
});

module.exports = app;
