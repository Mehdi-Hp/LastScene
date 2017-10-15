/* eslint-disable no-shadow */
const _ = require('lodash');
const debug = require('debug')('development');
const chalk = require('chalk');
const myapifilmsService = require('./myapifilmsService');
const Movie = require('../models/movie');
const movieQueue = require('../config/movieQueue')();

module.exports = (imdbID) => {
	const getMovie = (imdbID) => {
		return new Promise((resolve, reject) => {
			debug(chalk.yellow(`Getting movie information: ${imdbID} ...`));
			Movie.findOne({
				id: {
					imdb: imdbID
				}
			}, (error, existedMovie) => {
				if (error) {
					debug(chalk.bold.red(error));
					return reject(error);
				}
				if (existedMovie) {
					debug(chalk.green(`Movie information: ${imdbID} already exist in databse`));
					return resolve(new Movie(existedMovie));
				}
				if (!movieQueue.isThere(imdbID)) {
					movieQueue.add(imdbID);
					myapifilmsService.getMovie({
						imdbID
					})
					.then((movie) => {
						debug(chalk.green(`Got movie information: ${imdbID}. adding it to database...`));
						Movie.create(movie.data)
							.then((newMovie) => {
								debug(chalk.green(`Movie "${imdbID}" added to database`));
								movieQueue.delete(imdbID);
								resolve(newMovie);
							})
							.catch((error) => {
								debug(chalk.bold.red(error));
								movieQueue.delete(imdbID);
								reject(error);
							});
					})
					.catch((error) => {
						debug(chalk.bold.red(error.message));
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
