const omdbService = require('./omdbService');


module.exports = {
	search(query) {
		return new Promise((resolve, reject) => {
			omdbService(query).then((movies) => {
				resolve(movies);
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
