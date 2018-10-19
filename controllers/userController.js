const debug = require('debug')('app:usersController');
const chalk = require('chalk');
const User = require('../models/user');

module.exports = {
	async getOne(request, h) {
		const { username } = request.params;
		const user = await User.findOne({
			username
		});
		if (!user) {
			return h.notFound(`Couldn't find user [${username}]`);
		}
		return {
			name: user.name,
			email: user.authentication.local.email,
			username: user.username,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	}
};
