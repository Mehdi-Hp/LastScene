const request = require('request');
const chalk = require('chalk');
const debug = require('debug')('development');
const OmdbApi = require('omdb-api-pt');
const apiKeys = require('../config/apiKeys');

const omdb = new OmdbApi({
	apiKey: apiKeys.omdb
});

module.exports = (query) => {
	const movies = [];
	const requestOptions = {
		method: 'GET',
		url: `http://www.omdbapi.com/?apikey=${apiKeys.omdb}&s=${query.title}`,
		json: true
	};
	return new Promise((resolve, reject) => {
		debug(chalk.yellow(`Searching for query: [${query.title}] in OMDB...`));
		request(requestOptions, (error, res, body) => {
			if (error) {
				debug(chalk.red(error));
				reject({
					status: 500,
					message: 'Server error when searching for movie'
				});
			}
			if (!body.Response || !body) {
				resolve({});
			}
			body.Search.forEach((omdbMovie) => {
				movies.push(
					new Promise((resolve, reject) => {
						omdb.byId({
							imdb: omdbMovie.imdbID,
							type: 'movie'
						}).then((extendedOmdbMovie) => {
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
							reject(error);
						});
					})
				);
			});
			Promise.all(movies).then((movies) => {
				debug(chalk.yellow(`Found ${movies.length} movie for query: [${query.title}]`));
				resolve(movies);
			}).catch((error) => {
				debug(chalk.red(error));
				reject();
			});
		});
	});
};
