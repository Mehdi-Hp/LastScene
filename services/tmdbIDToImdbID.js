const request = require('request');
const apiKeys = require('../config/apiKeys');
const debug = require('debug')('development');

module.exports = (tmdbID) => {
	const requestOptions = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/movie/${tmdbID}`,
		qs: {
			api_key: apiKeys.tmdb.v3
		},
		json: true
	};
	return new Promise((resolve, reject) => {
		debug(`Finding imdbID from tmdbID: ${tmdbID}...`);
		request(requestOptions, (error, res, body) => {
			debug(`Got imdbID from tmdbID. It's ${body.imdb_id}`);
			return body.imdb_id;
		});
	});
};
