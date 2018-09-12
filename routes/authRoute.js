const Joi = require('joi');
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
							password: Joi.string().required(),
							email: Joi.string()
								.email({ minDomainAtoms: 2 })
								.required()
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
							name: Joi.string(),
							username: Joi.string()
								.min(3)
								.max(30)
								.required(),
							password: Joi.string().required(),
							email: Joi.string()
								.email({ minDomainAtoms: 2 })
								.required()
						}
					}
				}
			}
		]);
	}
};
