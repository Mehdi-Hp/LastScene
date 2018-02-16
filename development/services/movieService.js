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
				console.log(error);
				reject({
					error: true,
					message: 'Network error'
				});
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
			Vue.$axios.post('/movies', [imdbID]).then((addedMovie) => {
				addedMovie.data[0].title = movieName;
			});
		});
	}
};
