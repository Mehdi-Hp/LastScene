const request = require('request');

let moviesList = {};

const mdb = {
	searchMovie: (movieName, year, page, apiKey) => {
		const requestOptions = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/movie',
			qs: {
				query: movieName,
				year,
				page,
				api_key: apiKey,
				include_adult: true
			},
			json: true
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, res, body) => {
				if (error) {
					reject(error);
				}
				moviesList = {
					totalResults: body.total_results,
					totalPages: body.total_pages,
					currentPage: body.page
				};
				moviesList.data = body.results.map((currentValue, index, arr) => {
					return {
						title: currentValue.title,
						originalTitle: currentValue.original_title,
						releaseDate: currentValue.release_date,
						imdbRate: currentValue.vote_average,
						id: {
							tmdb: currentValue.id
						},
						poster: {
							tmdb: `https://image.tmdb.org/t/p/w550${currentValue.poster_path}`
						},
						backdrop: {
							tmdb: `https://image.tmdb.org/t/p/w550${currentValue.backdrop_path || currentValue.poster_path}`
						},
						plot: currentValue.overview
					};
				});

				resolve(moviesList);
			});
		});
	},
	getMovie: (tmdbID, apiKey) => {
		const requestOptions = {
			method: 'GET',
			url: `https://api.themoviedb.org/3/movie/${tmdbID}`,
			qs: {
				api_key: apiKey
			},
			json: true
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, res, body) => {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	}
};

module.exports = mdb;
