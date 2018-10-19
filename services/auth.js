const User = require('../models/user');
const { secret } = require('../config/appConf');

const validate = async function(decoded, request) {
	const { username } = request.params;
	request.auth.isAuthorized = decoded.data.username === username;
	return {
		isValid: true
	};
};

module.exports = async function(server) {
	server.auth.strategy('jwt', 'jwt', {
		key: secret,
		validate,
		verifyOptions: { algorithms: ['HS256'] }
	});

	server.auth.default('jwt');
};

module.exports.isAuthorized = (request, h) => {
	if (!request.auth.isAuthorized) {
		return h.forbidden(`You are not authorized to do this operation.`);
	}
	return true;
};

module.exports.checkUserExistance = async function(request, h) {
	const { username } = request.params;
	let user = null;

	try {
		user = await User.findOne({
			username
		});
	} catch (error) {
		console.log(error);
		return h.badImplementation(`Couldn't look for user [${username}]`);
	}
	if (!user) {
		return h.notFound(`Couldn't find user [${username}]`);
	}
	request.auth.user = user;
	return user;
};
