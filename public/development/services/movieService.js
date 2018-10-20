import Vue from 'vue';
import store from '../store';

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
	},
	toggleFavourite(movie) {
		movie.bus.favourite = true;
		if (!movie.favourite) {
			store.dispatch('addMovieToFavourites', movie)
				.then((updatedMovie) => {
					movie.bus.favourite = false;
					movie.favourite = true;
				});
		} else {
			store.dispatch('removeMovieFromFavourites', movie)
				.then((updatedMovie) => {
					movie.bus.favourite = false;
					movie.favourite = false;
				});
		}
	},
	toggleWatched(movie) {
		movie.bus.watched = true;
		if (!movie.watched) {
			store.dispatch('addMovieToWatched', movie)
				.then((updatedMovie) => {
					movie.bus.watched = false;
					movie.watched = true;
				});
		} else {
			store.dispatch('removeMovieFromWatched', movie)
				.then((updatedMovie) => {
					movie.bus.watched = false;
					movie.watched = false;
				});
		}
	},
	toggleWatchList(movie) {
		movie.bus.watchList = true;
		if (!movie.watchList) {
			store.dispatch('addMovieToWatchList', movie)
				.then((updatedMovie) => {
					movie.bus.watchList = false;
					movie.watchList = true;
				});
		} else {
			store.dispatch('removeMovieFromWatchList', movie)
				.then((updatedMovie) => {
					movie.bus.watchList = false;
					movie.watchList = false;
				});
		}
	}
};
