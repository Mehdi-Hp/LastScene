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
						i += 1;
						getMovieEvent.emit('gotIt', i);
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
						reject({
							status: 500,
							message: 'Error saving movie in database'
						});
					});
					myapifilmsService.getMovie(imdbID).then((movie) => {
						movie.data[0].loading = false;
						movie.data[0].fulfilled = true;
						debug(chalk.green(`__Got movie information: [${imdbID}]. adding it to database...`));
						i += 1;
						getMovieEvent.emit('gotIt', i);
						Movie.findByIdAndUpdate(imdbID, movie.data[0], { new: true }).then((fulfilledMovie) => {
							debug(chalk.green(`__Movie [${imdbID}] added to database`));
							movieQueue.delete(imdbID);
							getMoviesPromise.push(fulfilledMovie);
							resolve(fulfilledMovie);
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
