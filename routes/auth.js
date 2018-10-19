const JoiSchemas = require('./schemas/user');
const authController = require('../controllers/authController');

module.exports = {
	name: 'App Auth Routes',
	version: '0.0.0',
	async register(server, options) {
		server.route([
			{
				method: 'POST',
				path: '/auth/login',
				handler: authController.login,
				options: {
					auth: false,
					validate: {
						payload: {
							password: JoiSchemas.password().required(),
							email: JoiSchemas.email().required()
						}
					}
				}
			},
			{
				method: 'POST',
				path: '/auth/signup',
				handler: authController.signup,
				options: {
					auth: false,
					validate: {
						payload: {
							name: JoiSchemas.name(),
							username: JoiSchemas.username().required(),
							password: JoiSchemas.password().required(),
							email: JoiSchemas.email().required()
						}
					}
				}
			}
		]);
	}
};
