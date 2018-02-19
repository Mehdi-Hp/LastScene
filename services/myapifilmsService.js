const request = require('request');
const _ = require('lodash');
const debug = require('debug')('development');
const chalk = require('chalk');
const keys = require('../config/keys');
const Movie = require('../models/movie');
const getPoster = require('./getPoster');
const getBackdrop = require('./getBackdrop');

const myapifilms = {
	getMovie: (imdbID) => {
		const requestOptions = {
			method: 'GET',
			url: 'http://www.myapifilms.com/imdb/idIMDB',
			qs: {
				idIMDB: imdbID,
				token: keys.myapifilms,
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
		return new Promise((resolve, reject) => {
			debug(chalk.yellow(`____Making a request to myapifilms for [${imdbID}]...`));
			request(requestOptions, (error, res, body) => {
				if (error) {
					debug(chalk.bold.red(JSON.parse(JSON.stringify(error))));
					return reject({
						status: 500,
						message: error
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
					reject(response);
				} else {
					if (!body.data.movies.type === 'Movie') {
						reject({
							code: 400,
							message: 'You should send an imdbID for a "Movie"; not anything else'
						});
					}
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
								const result = (titleAward.titleAwardOutcome.includes('Won')) ? 'won' : 'nominated';
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
								poster: '',
								backdrop: ''
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

						getPoster(currentMovie.urlPoster, movie.id.imdb)
							.then((posters) => {
								movie.images.poster = posters;
								Movie.findByIdAndUpdate(movie.id.imdb, {
									'images.poster': {
										small: posters.small,
										medium: posters.medium,
										big: posters.big
									}
								},
								{
									new: true
								})
								.then((movieWithPoster) => {
									if (movieWithPoster) {
										debug(chalk.dim(`Posters pushed to movie [${movieWithPoster._id}]`));
									}
								})
								.catch((error) => {
									debug(chalk.bold.red(error));
									return reject(error);
								});
							})
							.catch((error) => {
								debug(chalk.bold.red(error));
								return reject(error);
							});

						request({
							method: 'GET',
							url: `https://api.themoviedb.org/3/find/${imdbID}`,
							qs: {
								api_key: keys.tmdb.v3,
								external_source: 'imdb_id'
							},
							json: true
						}, (error, res, body) => {
							if (error) {
								debug(chalk.bold.red(error));
								return reject(error);
							}
							if (body.movie_results[0].backdrop_path.length) {
								getBackdrop(`http://image.tmdb.org/t/p/original${body.movie_results[0].backdrop_path}`, movie.id.imdb)
									.then((backdrop) => {
										movie.images.backdrop = backdrop;
										Movie.findByIdAndUpdate(movie.id.imdb, {
											'images.backdrop': {
												small: backdrop.small,
												medium: backdrop.medium,
												big: backdrop.big
											}
										},
										{
											new: true
										})
										.then((movieWithBackdrop) => {
											if (movieWithBackdrop) {
												debug(chalk.dim(`Backdrops pushed to movie [${movieWithBackdrop._id}]`));
											}
										})
										.catch((error) => {
											debug(chalk.bold.red(error));
											return reject(error);
										});
									})
									.catch((error) => {
										debug(chalk.bold.red(error));
										return reject(error);
									});
									resolve(response);
							}
						});
						return movie;
					});
				}
			});
		});
	}
};

module.exports = myapifilms;
