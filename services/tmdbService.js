const request = require('request');
const apiKeys = require('../config/apiKeys');
const debug = require('debug')('development');
const tmdbIDToImdbID = require('./tmdbIDToImdbID');

let movies = {};

const tmdb = {
	findMovie: (information) => {
		const requestOptions = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/movie',
			qs: {
				query: information.title,
				year: information.year || undefined,
				page: information.page || undefined,
				api_key: apiKeys.tmdb.v3
			},
			json: true
		};
		return new Promise((resolve, reject) => {
			debug(`Searching for movie: ${information.title}`);
			request(requestOptions, (error, res, body) => {
				if (error) {
					debug(`GOT ERROR: ${error}`);
					reject(error);
				} else {
					movies = {
						totalResults: body.total_results,
						totalPages: body.total_pages,
						currentPage: body.page
					};
					movies.data = body.results.map((currentMovie, index, arr) => {
						return {
							title: currentMovie.title,
							originalTitle: currentMovie.original_title,
							year: currentMovie.release_date.slice(0, 4),
							rate: {
								imdb: currentMovie.vote_average
							},
							id: {
								tmdb: currentMovie.id
							},
							images: {
								poster: {
									tmdb: `https://image.tmdb.org/t/p/w600${currentMovie.poster_path}`
								},
								backdrop: {
									tmdb: `https://image.tmdb.org/t/p/w600${currentMovie.backdrop_path || currentMovie.poster_path}`
								}
							},
							plot: {
								simple: currentMovie.overview
							}
						};
					});

					resolve(movies);
				}
			}).on('error', (error) => {
				throw error;
			}).end();
		});
	}
};

module.exports = tmdb;
