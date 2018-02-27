const request = require('request');
const chalk = require('chalk');
const debug = require('debug')('development');
const OmdbApi = require('omdb-api-pt');

const omdb = new OmdbApi({
	apiKey: process.env.OMDB
});

module.exports = (query) => {
	const movies = [];
	const requestOptions = {
		method: 'GET',
		url: `http://www.omdbapi.com/?apikey=${process.env.OMDB}&s=${query.title}&type=movie`,
		json: true
	};
	return new Promise((resolve, reject) => {
		debug(chalk.yellow(`Searching for query: [${query.title}] in OMDB...`));
		request(requestOptions, (error, res, body) => {
			if (error) {
				debug(chalk.red(error));
				return reject({
					status: 500,
					message: 'Server error when searching for movie'
				});
			}
			if (!body.Response || !body || body.Response === 'False') {
				return reject({
					status: 404,
					message: 'No movie got found'
				});
			}
			body.Search.forEach((omdbMovie) => {
				movies.push(
					new Promise((resolve, reject) => {
						omdb.byId({
							imdb: omdbMovie.imdbID,
							type: 'movie'
						})
							.then((extendedOmdbMovie) => {
								resolve({
									title: extendedOmdbMovie.Title,
									year: extendedOmdbMovie.Year,
									directors: [{
										name: extendedOmdbMovie.Director.split(',')[0]
									}],
									simpleAwards: extendedOmdbMovie.Awards,
									rate: {
										imdb: extendedOmdbMovie.imdbRating,
										metaScore: extendedOmdbMovie.Metascore
									},
									id: {
										imdb: extendedOmdbMovie.imdbID
									},
									images: {
										poster: {
											default: extendedOmdbMovie.Poster
										}
									}
								});
							}).catch((error) => {
								debug(chalk.red(error));
								reject({
									status: '500',
									message: 'Server error when searching for movie'
								});
							});
					})
				);
			});
			Promise.all(movies)
				.then((movies) => {
					debug(chalk.yellow(`Found ${movies.length} movie for query: [${query.title}]`));
					resolve(movies);
				})
				.catch((error) => {
					debug(chalk.red(error));
					reject({
						status: '500',
						message: 'Server error when searching for movie'
					});
				});
		});
	});
};
