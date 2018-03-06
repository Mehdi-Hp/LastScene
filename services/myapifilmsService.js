const request = require('request');
const _ = require('lodash');
const debug = require('debug')('development');
const chalk = require('chalk');
const events = require('events');
const Movie = require('../models/movie');
const downloadPoster = require('./downloadPoster');

const eventEmitter = new events.EventEmitter();

const myapifilms = {
	bus: [],
	getMovie: (imdbID) => {
		myapifilms.bus.push(imdbID);
		return new Promise((resolve, reject) => {
			const getMovieFunction = (imdbID) => {
				const requestOptions = {
					method: 'GET',
					url: 'http://www.myapifilms.com/imdb/idIMDB',
					qs: {
						idIMDB: imdbID,
						token: process.env.MYAPIFILMS,
						format: 'json',
						filter: '3',
						trailers: '1',
						awards: '1',
						actors: '1',
						quotes: '1',
						fullSize: '1'
					},
					json: true
				};
				debug(chalk.yellow(`____Making a request to myapifilms for [${imdbID}]...`));
				request(requestOptions, (error, res, body) => {
					debug(chalk.yellow(`____Request fulfilled for [${imdbID}]...`));
					eventEmitter.removeListener('getNextMovie', getMovieFunction);
					myapifilms.bus = _.drop(myapifilms.bus);
					if (myapifilms.bus.length) {
						eventEmitter.emit('getNextMovie', _.head(myapifilms.bus));
					}
					if (error || !body.data) {
						debug(chalk.bold.red(JSON.stringify(error)));
						debug(chalk.bold.red((JSON.stringify(body))));
						return reject({
							status: 500,
							message: 'Server error. could not connect to API'
						});
					}
					const response = {};
					if (_.has(body, 'error')) {
						debug(chalk.bold.red(JSON.stringify(body.error)));
						/* eslint-disable indent */
						switch (body.error.code) {
							case 110:
								response.status = {
									status: 404,
									message: `Couldn't find [${imdbID}] in IMDB`
								};
								break;
							case 112:
								response.status = {
									status: 400,
									message: 'Invalid imdbID'
								};
								break;
							case 113:
								response.status = {
									status: 503,
									message: 'IMDB Service is currently unavailable, Sorry!'
								};
								break;
							default:
								response.status = {
									status: 500,
									message: 'There was an unknown error in server'
								};
						}
						return reject(response);
					}
					if (!body.data.movies.type === 'Movie') {
						debug(chalk.bold.red('IMDB ID is not for a movie'));
						return reject({
							code: 400,
							message: 'You should send an imdbID for a "Movie"; not anything else'
						});
					}
					const posterURL = body.data.movies[0].urlPoster;
					response.data = body.data.movies.map((currentMovie) => {
						let movie = {};
						movie.directors = currentMovie.directors.map((currentDirector) => {
							return {
								name: currentDirector.name,
								id: currentDirector.id
							};
						});
						movie.writers = currentMovie.writers.map((currentWriter) => {
							return {
								name: currentWriter.name,
								id: currentWriter.id
							};
						});
						movie.actors = currentMovie.actors.map((currentActor) => {
							return {
								name: currentActor.actorName,
								id: currentActor.actorId,
								photo: currentActor.urlPhoto,
								profile: currentActor.urlProfile,
								character: currentActor.character
							};
						});
						movie.awards = currentMovie.awards.map((currentAward) => {
							const titleAward = currentAward.titlesAwards.map((titleAward) => {
								if (!titleAward) {
									return {};
								}
								const result = (titleAward.titleAwardOutcome.includes('Winner')) ? 'won' : 'nominated';
								let title = _.trim(titleAward.titleAwardOutcome.substring(titleAward.titleAwardOutcome.indexOf(' ')));
								let participants = '';
								titleAward.categories.forEach((currentCategory) => {
									title = (currentCategory.category.length) ? currentCategory.category : title;
									participants = currentCategory.names.map((currentName) => {
										return {
											name: currentName.name
										};
									});
								});
								return {
									title,
									result,
									participants
								};
							});
							return {
								name: (currentAward.award.includes(',')) ? currentAward.award.substring(0, currentAward.award.lastIndexOf(',')) : currentAward.award.substring(0, currentAward.award.match(/\s\d{4}/).index),
								year: _.trim(currentAward.award.match(/\s\d{4}/)[0]),
								categories: titleAward
							};
						});
						movie = new Movie({
							_id: currentMovie.idIMDB,
							title: currentMovie.title,
							originalTitle: currentMovie.originalTitle,
							year: currentMovie.year,
							id: {
								imdb: currentMovie.idIMDB
							},
							url: {
								imdb: currentMovie.urlIMDB
							},
							rate: {
								imdb: currentMovie.rating,
								metascore: currentMovie.metascore
							},
							plot: {
								simple: currentMovie.simplePlot,
								full: currentMovie.plot
							},
							images: {
								poster: {
									small: `${currentMovie.idIMDB}--small.jpeg`,
									medium: `${currentMovie.idIMDB}--medium.jpeg`,
									big: `${currentMovie.idIMDB}--big.jpeg`
								},
								backdrop: {
									small: `${currentMovie.idIMDB}--small.jpeg`,
									medium: `${currentMovie.idIMDB}--medium.jpeg`,
									big: `${currentMovie.idIMDB}--big.jpeg`
								}
							},
							runtime: currentMovie.runtime,
							trailer: currentMovie.trailer.videoURL,
							directors: movie.directors,
							actors: movie.actors,
							writers: movie.writers,
							languages: currentMovie.languages,
							genres: currentMovie.genres,
							awards: movie.awards
						});
						return movie;
					});

					downloadPoster(posterURL, response.data[0]._id)
						.then((posters) => {
							return resolve(response);
						})
						.catch((error) => {
							debug(chalk.bold.red(error));
							return reject({
								status: 500,
								message: 'Error downloading movie poster'
							});
						});
				});
			};
			eventEmitter.on('getNextMovie', getMovieFunction);
			if (myapifilms.bus.length === 1) {
				eventEmitter.emit('getNextMovie', _.head(myapifilms.bus));
			}
		});
	}
};

module.exports = myapifilms;
