const request = require('request');
const chalk = require('chalk');
const debug = require('debug')('development');
const apiKeys = require('../config/apiKeys');

let movies = {};
let rateLimit = 40;

const tmdbService = {
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
			debug(chalk.yellow(`Searching for movie: ${information.title} in TMDB... [${rateLimit}]`));
			request(requestOptions, (error, res, body) => {
				rateLimit = res.headers['x-ratelimit-remaining'];
				if (body.status_code === 25) {
					debug(chalk.yellow(`Reached rate limit [${rateLimit}]`));
					return reject({
						status: '429',
						message: 'Reached rate limit'
					});
				}
				if (error) {
					debug(chalk.bold.red(error));
					return reject(error);
				}
				if (!body.results) {
					return reject(body);
				}
				movies = {
					totalResults: body.total_results,
					totalPages: body.total_pages,
					currentPage: body.page
				};
				movies.data = body.results.map((currentMovie) => {
					return {
						title: currentMovie.title,
						originalTitle: (currentMovie.original_title === currentMovie.title) ? null : currentMovie.original_title,
						year: currentMovie.release_date.slice(0, 4),
						rate: {
							imdb: currentMovie.vote_average
						},
						id: {
							tmdb: currentMovie.id
						},
						images: {
							poster: {
								tmdb: `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`
							},
							backdrop: {
								tmdb: `https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path || currentMovie.poster_path}`
							}
						}
					};
				});
				resolve(movies);
			}).on('error', (error) => {
				reject(error);
			}).end();
		});
	},
	findImdbID(tmdbID) {
		const requestOptions = {
			method: 'GET',
			url: `https://api.themoviedb.org/3/movie/${tmdbID}`,
			qs: {
				api_key: apiKeys.tmdb.v3
			},
			json: true
		};
		return new Promise((resolve, reject) => {
			debug(chalk.green(`Finding imdbID of tmdbID: ${tmdbID}... [${rateLimit}]`));
			request(requestOptions, (error, res, body) => {
				rateLimit = res.headers['x-ratelimit-remaining'];
				if (error) {
					return reject(error);
				}
				if (!body.imdb_id) {
					debug(chalk.green(`Got NO IMDB_ID from TMDB_ID. [${rateLimit}]`));
					return reject(null);
				}
				debug(chalk.green(`Got IMDB_ID from TMDB_ID. It's ${body.imdb_id} (for ${body.title}) [${rateLimit}]`));
				return resolve(body.imdb_id);
			});
		});
	}
};

module.exports = tmdbService;
