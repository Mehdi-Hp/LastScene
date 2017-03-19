const request = require('request');
const apiKeys = require('../config/apiKeys');

const tmdb = {
	searchMovie: (movieName, year, language, includeAdult, page) => {
		const requestOptions = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/movie',
			qs: {
				year,
				include_adult: includeAdult,
				page,
				query: movieName,
				language,
				api_key: apiKeys.tmdb.v3
			},
			body: '{}'
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, response, body) => {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	},
	searchTVShow: (tvShowName, language, page) => {
		const requestOptions = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/tv',
			qs: {
				page,
				query: tvShowName,
				language,
				api_key: apiKeys.tmdb.v3
			},
			body: '{}'
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, response, body) => {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	},
	searchPerson: (personName, language, includeAdult, region, page) => {
		const requestOptions = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/person',
			qs: {
				page,
				query: personName,
				language,
				region,
				api_key: apiKeys.tmdb.v3
			},
			body: '{}'
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, response, body) => {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	}
};

module.exports = tmdb;
