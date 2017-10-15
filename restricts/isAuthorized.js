const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey');
const debug = require('debug')('development');
const chalk = require('chalk');
const User = require('../models/user');

module.exports = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({
			auth: false,
			message: 'No token provided'
		});
	}
	jwt.verify(token, secretKey, (error, decoded) => {
		if (error) {
			debug(chalk.bold.red(error));
			if (error.name === 'TokenExpiredError') {
				return res.status(401).json({
					auth: false,
					code: '001',
					message: 'Expired token'
				});
			}
			return res.status(401).json({
				auth: false,
				code: '002',
				message: 'Invalid token'
			});
		}

		req.user = decoded.data;
		next();
	});
};
