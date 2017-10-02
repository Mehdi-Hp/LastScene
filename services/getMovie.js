/* eslint-disable no-shadow */
const debug = require('debug')('development');
const myapifilmsService = require('./myapifilmsService');
const Movie = require('../models/movie');

module.exports = (imdbID) => {
	return new Promise((resolve, reject) => {
		debug(`Getting movie information: ${imdbID} ...`);
		Movie.findOne({
			id: {
				imdb: imdbID
			}
		}, (error, existedMovie) => {
			if (error) {
				return reject(error);
			}
			if (existedMovie) {
				debug(`Movie information: ${imdbID} already exist in databse`);
				return resolve(new Movie(existedMovie));
			}

			myapifilmsService.getMovie({
				imdbID
			})
			.then((movie) => {
				debug(`Got movie information: ${imdbID}. adding it to database...`);
				Movie.create(movie.data)
					.then((newMovie) => {
						debug(`Movie "${imdbID}" added to database`);
						resolve(newMovie);
					})
					.catch((error) => {
						reject(error);
					});
			})
			.catch((error) => {
				reject(error.status.code);
			});
		});
	});
};
