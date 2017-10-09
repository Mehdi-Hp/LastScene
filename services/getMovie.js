/* eslint-disable no-shadow */
const _ = require('lodash');
const debug = require('debug')('development');
const myapifilmsService = require('./myapifilmsService');
const Movie = require('../models/movie');
const movieQueue = require('../config/movieQueue')();

module.exports = (imdbID) => {
	const getMovie = (imdbID) => {
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
				if (!movieQueue.isThere(imdbID)) {
					movieQueue.add(imdbID);
					myapifilmsService.getMovie({
						imdbID
					})
					.then((movie) => {
						debug(`Got movie information: ${imdbID}. adding it to database...`);
						Movie.create(movie.data)
							.then((newMovie) => {
								debug(`Movie "${imdbID}" added to database`);
								movieQueue.delete(imdbID);
								resolve(newMovie);
							})
							.catch((error) => {
								movieQueue.delete(imdbID);
								reject(error);
							});
					})
					.catch((error) => {
						movieQueue.delete(imdbID);
						reject({
							error: true,
							status: error.status,
							message: error.message
						});
					});
				} else {
					debug(`Already looking for ${imdbID} information...`);
				}
			});
		});
	}

	if (_.isArray(imdbID)) {
		imdbID.forEach((theImdbID) => {
			getMovie(theImdbID);
		});
	} else {
		getMovie(imdbID);
	}
};
