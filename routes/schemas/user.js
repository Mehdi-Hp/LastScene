const Joi = require('joi');

module.exports = {
	name() {
		return Joi.string()
			.min(3)
			.max(30);
	},
	username() {
		return Joi.string()
			.min(3)
			.max(30);
	},
	email() {
		return Joi.string().email({ minDomainAtoms: 2 });
	},
	password() {
		return Joi.string();
	}
};
