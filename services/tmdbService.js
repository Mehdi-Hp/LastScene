const request = require('request');
const apiKeys = require('../config/apiKeys');

const tmdb = {
	searchMovie: (movieName) => {
		return new Promise((resolve, reject) => {
			request(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeys.tmdb.v3}&query=${movieName}`, (error, response, body) => {
				console.log(` *** getting movie (${movieName}) details ***`);
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	},
};

module.exports = tmdb;
