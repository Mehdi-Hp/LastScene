const request = require('request');
const Movie = require('../classes/movie');

let movies = {};

const mdb = {
	searchMovie: (movieTitle, year, page, apiKey) => {
		const requestOptions = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/movie',
			qs: {
				query: movieTitle,
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
				movies = {
					totalResults: body.total_results,
					totalPages: body.total_pages,
					currentPage: body.page
				};
				movies.data = body.results.map((currentMovie, index, arr) => {
					return new Movie({
						title: currentMovie.title,
						originalTitle: currentMovie.original_title,
						year: currentMovie.release_date,
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
						plot: currentMovie.overview
					});
				});

				resolve(movies);
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
