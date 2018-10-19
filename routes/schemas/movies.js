const Joi = require('joi');

module.exports = {
	movieId() {
		return Joi.string();
	},
	imdbId() {
		return Joi.string().regex(/^tt\d{7}$/);
	},
	watched() {
		return Joi.boolean();
	},
	watchList() {
		return Joi.boolean();
	},
	favourite() {
		return Joi.boolean();
	},
	note() {
		return Joi.string();
	}
};
