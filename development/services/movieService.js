import Vue from 'vue';

export default {
	search(searchQuery = '', movies = {}) {
		return new Promise((resolve, reject) => {
			if (!searchQuery.length) {
				reject({
					error: true,
					message: 'Got no search query'
				});
			}
			Vue.$axios.get(`/find/movie/${searchQuery}`).then((res) => {
				if (res.error) {
					return reject(res.error);
				}
				const flattenFoundedMovies = res.data;
				const standardedMovies = [];
				const imdbIDsInArchive = Vue.$_.flatMap(movies, (movie) => {
					return movie.data._id;
				});
				flattenFoundedMovies.forEach((movie) => {
					const standardedMovie = {};
					standardedMovie.data = movie;
					standardedMovie.bus = {};
					if (imdbIDsInArchive.indexOf(movie.id.imdb) > -1) {
						standardedMovie.inArchive = true;
					} else {
						standardedMovie.inArchive = false;
					}
					standardedMovies.push(standardedMovie);
				});
				resolve(standardedMovies);
			}).catch((error) => {
				reject(error.response.data);
			});
		});
	},
	get(imdbID) {
		return new Promise((resolve, reject) => {
			Vue.$axios.get(`/movies/${imdbID}`)
				.then((res) => {
					resolve(res.data.data._id);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	checkForFulfilled(imdbID) {
		return new Promise((resolve, reject) => {
			this.get(imdbID)
				.then((movie) => {
					resolve(movie);
				}).catch((error) => {
					reject(error);
				});
		});
	},
	addToArchive(imdbID, movieName) {
		return new Promise((resolve, reject) => {
			if (!imdbID) {
				reject({
					error: true,
					message: 'Bad request. No IMDB ID.'
				});
			}
			Vue.$axios.post(`/movies/${imdbID}`).then((addedMovie) => {
				addedMovie.data[0].title = movieName;
				resolve(addedMovie);
			});
		});
	}
};
