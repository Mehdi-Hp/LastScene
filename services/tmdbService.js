const request = require('request');
const chalk = require('chalk');
const debug = require('debug')('app:tmdbService');

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
				api_key: process.env.TMDB_V3
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
						originalTitle: currentMovie.original_title === currentMovie.title ? null : currentMovie.original_title,
						year: currentMovie.release_date.slice(0, 4),
						rate: {
							imdb: currentMovie.vote_average
						},
						id: {
							tmdb: currentMovie.id
						},
						images: {
							poster: `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`,
							backdrop: `https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path || currentMovie.poster_path}`
						}
					};
				});
				resolve(movies);
			})
				.on('error', (error) => {
					reject(error);
				})
				.end();
		});
	},
	findImdbID(tmdbID) {
		return new Promise((resolve, reject) => {
			debug(chalk.green(`Finding imdbID of tmdbID: ${tmdbID}... [${rateLimit}]`));
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/movie/${tmdbID}`,
					qs: {
						api_key: process.env.TMDB_V3
					},
					json: true
				},
				(error, res, body) => {
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
				}
			);
		});
	},
	getPosterURL(imdbID) {
		debug(chalk.green(`Getting poster URL for [${imdbID}] using TMDB`));
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/find/${imdbID}`,
					qs: {
						api_key: process.env.TMDB_V3,
						external_source: 'imdb_id'
					},
					json: true
				},
				(error, res, body) => {
					if (error) {
						debug(chalk.bold.red(error));
						reject({
							status: 500,
							message: `Error getting poster URL: ${error}`
						});
					}
					if (body.movie_results[0] && body.movie_results[0].poster_path.length) {
						resolve(`http://image.tmdb.org/t/p/original${body.movie_results[0].poster_path}`);
					} else {
						reject({
							status: 500,
							message: 'Error getting poster URL'
						});
					}
				}
			);
		});
	},
	getBackdropURL(imdbID) {
		debug(chalk.green(`Getting backdrop URL for [${imdbID}] using TMDB`));
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/find/${imdbID}`,
					qs: {
						api_key: process.env.TMDB_V3,
						external_source: 'imdb_id'
					},
					json: true
				},
				(error, res, body) => {
					if (error) {
						debug(chalk.bold.red(error));
						reject({
							status: 500,
							message: `Error getting backdrop URL: ${error}`
						});
					}
					if (body.movie_results[0] && body.movie_results[0].backdrop_path && body.movie_results[0].backdrop_path.length) {
						resolve(`http://image.tmdb.org/t/p/original${body.movie_results[0].backdrop_path}`);
					} else {
						reject({
							status: 404,
							message: 'No backdrop found'
						});
					}
				}
			);
		});
	}
};

module.exports = tmdbService;
