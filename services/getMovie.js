// const _ = require('lodash');
const events = require('events');
const debug = require('debug')('development');
const chalk = require('chalk');
const myapifilmsService = require('./myapifilmsService');
const Movie = require('../models/movie');
const movieQueue = require('../config/movieQueue')();

const getMovieEvent = new events.EventEmitter();

module.exports = (imdbIDs) => {
	let i = 0;
	const getMoviesPromise = [];
	const savedGottedMovies = [];
	const getMovie = (imdbID) => {
		getMoviesPromise.push(
			new Promise((resolve, reject) => {
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
					if (existedMovie) {
						debug(chalk.green(`Movie information: [${imdbID}] already exist in database`));
						return resolve(existedMovie);
					}
					if (movieQueue.isThere(imdbID)) {
						debug(chalk.bold(`Already looking for [${imdbID}] information...`));
						return;
					}
					movieQueue.add(imdbID);
					debug(chalk.yellow(`__Not in database. Searching for movie information [${imdbID}] ...`));
					myapifilmsService.getMovie(imdbID).then((movie) => {
						debug(chalk.green(`__Got movie information: [${imdbID}]. adding it to database...`));
						i += 1;
						getMovieEvent.emit('gotIt', i);
						Movie.create(movie.data).then((newMovie) => {
							debug(chalk.green(`__Movie [${imdbID}] added to database`));
							movieQueue.delete(imdbID);
							getMoviesPromise.push(newMovie);
							resolve(newMovie);
						}).catch((error) => {
							debug(chalk.bold.red(error));
							movieQueue.delete(imdbID);
							getMoviesPromise.push(error);
							reject(error);
						});
					}).catch((error) => {
						movieQueue.delete(imdbID);
						getMoviesPromise.push(error);
						reject({
							status: error.status,
							message: error.message
						});
					});
				}).catch((error) => {
					debug(chalk.bold.red(error));
					return reject(error);
				});
			})
		);
	};

	getMovie(imdbIDs[0]);
	getMovieEvent.on('gotIt', (i) => {
		if (!imdbIDs[i]) {
			return getMoviesPromise;
		}
		debug(chalk.yellow(`Got [${imdbIDs[i - 1]}]. going for [${imdbIDs[i]}]...`));
		getMovie(imdbIDs[i]);
	});
};
