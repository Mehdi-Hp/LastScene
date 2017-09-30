const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey');
const debug = require('debug')('development');

module.exports = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		debug(req);
		return res.status(401).json({
			auth: false,
			message: 'No token provided'
		});
	}
	jwt.verify(token, secretKey, (error, decoded) => {
		if (error) {
			debug(`ERROR: ${error}`);
			return res.status(401).json({
				auth: false,
				message: 'Invalid token'
			});
		}

		debug(`User is authorized: ${JSON.stringify(decoded)}`);
		next();
	});
};
