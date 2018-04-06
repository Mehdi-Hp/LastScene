const jwt = require('jsonwebtoken');
const debug = require('debug')('development');
const chalk = require('chalk');

module.exports = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		debug(chalk.bold.red('No token provided'));
		return res.status(401).json({
			auth: false,
			message: 'No token provided'
		});
	}
	jwt.verify(token, process.env.SECRET, (error, decoded) => {
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
