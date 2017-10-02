const request = require('request');
const _ = require('lodash');
const apiKeys = require('../config/apiKeys');
const Movie = require('../models/movie');
const getPoster = require('./getPoster');
const getBackdrop = require('./getBackdrop');
const debug = require('debug')('development');

const myapifilms = {
	getMovie: (information) => {
		const requestOptions = {
			method: 'GET',
			url: 'http://www.myapifilms.com/imdb/idIMDB',
			qs: {
				idIMDB: information.imdbID,
				token: apiKeys.myapifilms,
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
		const requestOptionsToFanart = {
			method: 'GET',
			url: `http://webservice.fanart.tv/v3/movies/${information.imdbID}`,
			qs: {
				api_key: apiKeys.fanart
			},
			header: {
				'api-key': apiKeys.fanart
			},
			json: true
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, res, body) => {
				if (error) {
					reject(error);
				}
				const response = {};
				if (_.has(body, 'error')) {
					response.status = {
						type: 'error'
					};
					/* eslint-disable indent */
					switch (body.error.code) {
						case 110:
							response.status = {
								code: 404,
								message: 'Movie not found'
							};
							break;
						case 112:
							response.status = {
								code: 400,
								message: 'Invalid IMDB ID'
							};
							break;
						case 113:
							response.status = {
								code: 503,
								message: 'Service is currently unavailable, Sorry!'
							};
							break;
						default:
							return;
					}
					reject(response);
				} else {
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
							const outcomes = currentAward.titlesAwards.map((currentOutcome) => {
								const categories = currentOutcome.categories.map((currentCategory) => {
									const names = currentCategory.names.map((currentName) => {
										return {
											name: currentName.name,
											id: currentName.id
										};
									});
									return {
										for: currentCategory.category,
										by: names
									};
								});
								return {
									name: currentOutcome.titleAwardOutcome,
									categories
								};
							});
							return {
								name: currentAward.award,
								outcomes
							};
						});
						movie = new Movie({
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
								Movie.findOneAndUpdate({
									id: {
										imdb: movie.id.imdb
									}
								}, {
									images: {
										poster: {
											small: posters.small,
											medium: posters.medium,
											big: posters.big
										}
									}
								},
								{
									new: true
								},
								(error, movieWithPoster) => {
									if (error) {
										return error;
									}
								});
							}).catch((error) => {
								return error;
							});

						request(requestOptionsToFanart, (error, res, body) => {
							if (error) {
								reject(error);
							}
							getBackdrop(body.moviebackground[0].url, movie.id.imdb)
								.then((backdrops) => {
									Movie.findOneAndUpdate({
										id: {
											imdb: movie.id.imdb
										}
									}, {
										'images.backdrop': {
											small: backdrops.small,
											medium: backdrops.medium,
											big: backdrops.big
										}
									},
									(error, movieWithBackdrop) => {
										if (error) {
											return error;
										}
									});
								}).catch((error) => {
									return error;
								});
						});

						return movie;
					});
				}
				resolve(response);
			});
		});
	}
};

module.exports = myapifilms;
