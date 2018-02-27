const debug = require('debug')('development');
const chalk = require('chalk');
const omdbService = require('./omdbService');
const myapifilmsService = require('./myapifilmsService');
const tmdbService = require('./tmdbService');
const Movie = require('../models/movie');
const movieQueue = require('../config/movieQueue')();
// const downloadPoster = require('./downloadPoster');
const downloadBackdrop = require('./downloadBackdrop');
const downloadPoster = require('./downloadPoster');

module.exports = {
	search(query) {
		return new Promise((resolve, reject) => {
			omdbService(query).then((movies) => {
				resolve(movies);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	getComplete(imdbID) {
		Promise.all([
			this.getInformation(imdbID),
			this.getBackdrop(imdbID)
		])
			.then((movieData) => {
				return movieData;
			})
			.catch((error) => {
				debug(chalk.red.bold(error));
				return {
					status: 500,
					message: 'Could not get movie information because of server error'
				};
			});
	},
	getInformation(imdbID) {
		return new Promise((resolve, reject) => {
			if (!imdbID) {
				return reject({
					status: 400,
					message: 'Your request does not fit in our standards'
				});
			}
			debug(chalk.yellow(`Check movie information in database: [${imdbID}] ...`));
			Movie.findOne({
				_id: imdbID
			}).then((existedMovie) => {
				if (existedMovie && existedMovie.fulfilled) {
					debug(chalk.green(`Movie information: [${imdbID}] already exist in database`));
					return resolve(existedMovie);
				}
				if (movieQueue.isThere(imdbID)) {
					debug(chalk.bold(`Already looking for [${imdbID}] information...`));
					return;
				}
				movieQueue.add(imdbID);
				debug(chalk.yellow(`__Not in database. Searching for movie information [${imdbID}] ...`));
				Movie.create({
					_id: imdbID,
					loading: true,
					fulfilled: false
				}).then((initialMovie) => {
					debug(chalk.yellow(`__Added initial movie data [${imdbID}] ...`));
				}).catch((error) => {
					return reject({
						status: 500,
						message: 'Error saving movie in database'
					});
				});
				myapifilmsService.getMovie(imdbID).then((movie) => {
					debug(chalk.green(`____Got movie information: [${imdbID}]. adding it to database...`));
					movie.data[0].loading = false;
					movie.data[0].fulfilled = true;
					Movie.findByIdAndUpdate(imdbID, movie.data[0], { new: true }).then((fulfilledMovie) => {
						debug(chalk.green(`__Movie [${imdbID}] added to database`));
						movieQueue.delete(imdbID);
						resolve(fulfilledMovie);
					}).catch((error) => {
						debug(chalk.bold.red(error));
						movieQueue.delete(imdbID);
						reject(error);
					});
				}).catch((error) => {
					movieQueue.delete(imdbID);
					debug(chalk.red.bold(`____Error in request to myapifilms for [${imdbID}]: ${error}`));
					reject(error);
				});
			}).catch((error) => {
				console.dir(error);
				debug(chalk.bold.red(error));
				return reject({
					status: 500,
					message: 'Error checking movie in database'
				});
			});
		});
	},
	getPoster(imdbID) {
		return new Promise((resolve, reject) => {
			tmdbService.getPosterURL(imdbID)
				.then((posterURL) => {
					downloadPoster(posterURL, imdbID)
						.then((poster) => {
							return resolve(poster);
						})
						.catch((error) => {
							debug(chalk.bold.red(error));
							return reject(error);
						});
				})
				.catch((error) => {
					return reject(error);
				});
		});
	},
	getBackdrop(imdbID) {
		return new Promise((resolve, reject) => {
			tmdbService.getBackdropURL(imdbID)
				.then((backdropURL) => {
					downloadBackdrop(backdropURL, imdbID)
						.then((backdrop) => {
							resolve(backdrop);
						})
						.catch((error) => {
							debug(chalk.bold.red(error));
							reject(error);
						});
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};
