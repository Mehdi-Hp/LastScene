const request = require('request');
const Movie = require('../classes/movie');
const apiKeys = require('../config/apiKeys');

let movies = {};

const myapifilms = {
	searchMovie: (information) => {
		const requestOptions = {
			method: 'GET',
			url: 'http://www.myapifilms.com/imdb/idIMDB',
			qs: {
				title: information.title,
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
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, res, body) => {
				if (error) {
					reject(error);
				}
				movies = {
					totalResults: body.data.movies.length
				};
				movies.data = body.data.movies.map((currentMovie) => {
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
						runtime: currentMovie.runtime,
						images: {
							poster: {
								myapifilms: currentMovie.urlPoster
							},
							backdrop: {}
						},
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

				resolve(movies);
			});
		});
	}
};

module.exports = myapifilms;
