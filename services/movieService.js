const debug = require('debug')('development');
const chalk = require('chalk');
const cloudinary = require('cloudinary').v2;
const omdbService = require('./omdbService');
const myapifilmsService = require('./myapifilmsService');
const tmdbService = require('./tmdbService');
const Movie = require('../models/movie');

module.exports = {
	queue: [],
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
		return new Promise((resolve, reject) => {
			if (!imdbID) {
				return reject({
					status: 400,
					message: 'Your request does not fit in our standards'
				});
			}
			debug(chalk.greenBright(`Check movie [${imdbID}] information in database...`));
			Movie.findOne({
				_id: imdbID
			}).then((existedMovie) => {
				if (existedMovie && existedMovie.fulfilled) {
					debug(chalk.green(`Movie information: [${imdbID}] already exist in database`));
					return resolve(existedMovie);
				}
				if (this.queue.includes(imdbID)) {
					debug(chalk.bold(`Already looking for [${imdbID}] information...`));
					return resolve({
						_id: imdbID,
						loading: true,
						fulfilled: false
					});
				}
				this.queue.push(imdbID);
				debug(chalk.greenBright(`Not in database. Searching for movie information [${imdbID}] ...`));
				Movie.create({
					_id: imdbID,
					loading: true,
					fulfilled: false
				})
					.then((initialMovie) => {
						debug(chalk.yellow(`__Added initial movie [${imdbID}] data`));
					})
					.catch((error) => {
						return reject({
							status: 500,
							message: `Error saving initial movie [${imdbID}] in database`
						});
					});
				const movieInCunstruction = {};
				Promise.all([
					this.getInformation(imdbID).then((movie) => {
						movieInCunstruction.data = movie;
					}),
					this.getPoster(imdbID).then((poster) => {
						movieInCunstruction.poster = poster;
					}),
					this.getBackdrop(imdbID).then((backdrop) => {
						movieInCunstruction.backdrop = backdrop;
					})
				])
					.then(() => {
						debug(chalk.green.bold(`Got eveything you may need for [${imdbID}]`));
						const movie = movieInCunstruction.data;
						movie.images = {
							poster: movieInCunstruction.poster,
							backdrop: movieInCunstruction.backdrop
						};
						movie.fulfilled = true;
						movie.loading = false;
						Movie.findByIdAndUpdate(imdbID, movie, { new: true })
							.then((fulfilledMovie) => {
								 debug(chalk.green(`__Movie [${imdbID}] added to database`));
								 this.queue.splice(1, this.queue.indexOf(imdbID));
								 return resolve(movie);
							 })
							.catch((error) => {
								 debug(chalk.bold.red(error));
								 this.queue.splice(1, this.queue.indexOf(imdbID));
								 return reject(error);
							 });
					})
					.catch((error) => {
						debug(chalk.red.bold(error));
						return reject({
							status: 500,
							message: 'Could not get movie information because of server error'
						});
					});
			}).catch((error) => {
				debug(chalk.bold.red(error));
				return reject({
					status: 500,
					message: `Error checking movie [${imdbID}] in database`
				});
			});
		});
	},
	getInformation(imdbID) {
		return new Promise((resolve, reject) => {
			myapifilmsService.getMovie(imdbID)
				.then((movie) => {
					debug(chalk.green(`____Got movie information: [${imdbID}]`));
					resolve(movie);
				})
				.catch((error) => {
					debug(chalk.red.bold(`____Error in request to myapifilms for [${imdbID}]: ${error}`));
					reject(error);
				});
		});
	},
	getPoster(imdbID) {
		return new Promise((resolve, reject) => {
			tmdbService.getPosterURL(imdbID)
				.then((posterURL) => {
					cloudinary.uploader.upload(posterURL, {
						public_id: imdbID,
						folder: '/poster/'
					}, (error, result) => {
						if (error) {
							reject({
								status: 500,
								message: 'Could not save poster'
							})
						}
						debug(chalk.green(`Successfully uploaded poster of [${imdbID}] to cloudinary`));
						resolve(result.public_id);
					});
				})
				.catch((error) => {
					debug(chalk.bold.red(error));
					return reject({
						status: 500,
						message: 'Could not get URL from TMDB'
					});
				});
		});
	},
	getBackdrop(imdbID) {
		return new Promise((resolve, reject) => {
			tmdbService.getBackdropURL(imdbID)
				.then((backdropURL) => {
					cloudinary.uploader.upload(backdropURL, {
						public_id: imdbID,
						folder: '/backdrop/'
					}, (error, result) => {
						if (error) {
							reject({
								status: 500,
								message: 'Could not save backdrop'
							})
						}
						debug(chalk.green(`Successfully uploaded backdrop of [${imdbID}] to cloudinary`));
						resolve(result.public_id);
					});
				})
				.catch((error) => {
					debug(chalk.bold.red(error));
					return reject({
						status: 500,
						message: 'Could not get URL from TMDB'
					});
				});
		});
	}
};
