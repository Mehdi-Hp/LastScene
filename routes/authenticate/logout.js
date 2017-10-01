const app = require('express')();
const debug = require('debug')('development');

app.route('/')
	.get((req, res, next) => {
		debug('Logging out the user...');
		req.logout();
	});

module.exports = app;
