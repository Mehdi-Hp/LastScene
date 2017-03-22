const request = require('request');
const imdbAPI = require('imdb-api');
const apiKeys = require('../config/apiKeys');

const imdb = {
	searchMovie: (movieName) => {
		return new Promise((resolve, reject) => {
			imdbAPI.getReq({
				name: movieName
			}).then((movies) => {
				resolve(movies);
			}).catch((error) => {
				reject(error);
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
			body: '{}',
			json: true
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
			body: '{}',
			json: true
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

module.exports = imdb;
