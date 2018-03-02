import Vue from 'vue';
import Vuex from 'vuex';
import fastSort from 'fast-sort';
import renameObjectsKeys from './helpers/renameObjectsKeys';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: {
			info: {},
			movies: {},
			collections: {}
		}
	},
	getters: {},
	mutations: {
		setUset(state, user) {
			state.user.info = Vue.$_.omit(user.data, ['movies', 'lists']);

			state.user.movies = renameObjectsKeys(user.data.movies, {
				_id: 'data'
			});

			state.user.movies = fastSort(state.user.movies).desc((movie) => {
				return movie.createdAt;
			});
			Vue.$_.forEach(state.user.movies, (movie, key) => {
				movie.hoverState = false;
				movie.openMenu = false;
				Vue.set(movie, 'favourite', Vue.$_.defaultTo(movie.favourite, false));
				Vue.set(movie, 'watched', Vue.$_.defaultTo(movie.watched, false));
				Vue.set(movie, 'watchList', Vue.$_.defaultTo(movie.watchList, false));
				Vue.set(movie, 'remove', Vue.$_.defaultTo(movie.remove, false));
				Vue.set(movie, 'bus', {
					favourite: false,
					watched: false,
					watchList: false,
					remove: false,
					isAdding: false
				});
			});

			state.user.collections = renameObjectsKeys(user.data.lists, {
				_id: 'data'
			});
		},
		pushMovie(state, movie) {
			state.user.movies.unshift(movie);
		},
		updateMovieData(state, newMovieData) {
			const newMovie = {};
			newMovie.data = newMovieData;
			newMovie.hoverState = false;
			newMovie.openMenu = false;
			Vue.set(newMovie, 'favourite', Vue.$_.defaultTo(newMovie.favourite, false));
			Vue.set(newMovie, 'watched', Vue.$_.defaultTo(newMovie.watched, false));
			Vue.set(newMovie, 'watchList', Vue.$_.defaultTo(newMovie.watchList, false));
			Vue.set(newMovie, 'remove', Vue.$_.defaultTo(newMovie.remove, false));
			newMovie.bus = {
				favourite: false,
				watched: false,
				watchList: false,
				remove: false
			};
			const oldMovieIndex = Vue.$_.findIndex(state.user.movies, {
				data: {
					_id: newMovieData._id
				}
			});
			console.log(newMovie);
			console.log(state.user.movies[oldMovieIndex]);
			Vue.set(state.user.movies, oldMovieIndex, newMovie);
		},
		toggleMovieFavourite(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.user.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.user.movies[theMovieIndex].favourite = !state.user.movies[theMovieIndex].favourite;
		},
		toggleMovieWatched(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.user.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.user.movies[theMovieIndex].watched = !state.user.movies[theMovieIndex].watched;
		},
		toggleMovieWatchList(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.user.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.user.movies[theMovieIndex].watchList = !state.user.movies[theMovieIndex].watchList;
		},
		removeMovie(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.user.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.user.movies.splice(theMovieIndex, 1);
		},
		setMovies(state, movies) {
			state.user.movies = movies;
		},
		sortMovies(state, { sortBy, order }) {
			const sortCase = {
				title(movie) {
					return movie.data.title;
				},
				director(movie) {
					return movie.data.directors[0].name;
				},
				year(movie) {
					return movie.data.year;
				},
				createdAt(movie) {
					return movie.data.createdAt;
				},
				rate(movie) {
					return movie.rate;
				},
				imdbRate(movie) {
					return movie.data.rate.imdb;
				},
				mostAwards(movie) {
					return movie.data.awards.length;
				}
			};
			if (order === 'asc') {
				state.user.movies = fastSort(state.user.movies).asc((movie) => {
					return sortCase[sortBy](movie);
				});
			} else if (order === 'desc') {
				state.user.movies = fastSort(state.user.movies).desc((movie) => {
					return sortCase[sortBy](movie);
				});
			}
		}
	},
	actions: {
		fetchUser({ commit, state }) {
			Vue.$axios.get('/user').then((res) => {
				commit('setUset', res.data);
			}).catch((error) => {
				throw new Error(error);
			});
		},
		addMovie({ commit, state }, { imdbID, movieName }) {
			return new Promise((resolve, reject) => {
				if (!imdbID) {
					reject({
						error: true,
						message: 'Bad request. No IMDB ID.'
					});
				}
				Vue.$axios.post(`/movies/${imdbID}`)
					.then((addedMovie) => {
						const newMovie = {
							bus: {},
							data: {
								title: movieName,
								loading: true,
								_id: addedMovie.data._id
							}
						};
						resolve(newMovie);
						commit('pushMovie', newMovie);
					});
			});
		},
		addMovieToFavourites({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					favourite: true
				}).then((updatedMovie) => {
					setTimeout(() => {
						commit('toggleMovieFavourite', movie);
						resolve();
					}, 2000);
				}).catch((error) => {
					reject(error);
				});
			});
		},
		removeMovieFromFavourites({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					favourite: false
				}).then((updatedMovie) => {
					commit('toggleMovieFavourite', movie);
					resolve(movie.favourite);
				}).catch((error) => {
					reject(error);
				});
			});
		},
		addMovieToWatched({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					watched: true
				}).then((updatedMovie) => {
					setTimeout(() => {
						commit('toggleMovieWatched', movie);
						resolve();
					}, 1400);
				}).catch((error) => {
					reject(error);
				});
			});
		},
		removeMovieFromWatched({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					watched: false
				}).then((updatedMovie) => {
					commit('toggleMovieWatched', movie);
					resolve();
				}).catch((error) => {
					reject(error);
				});
			});
		},
		addMovieToWatchList({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					watchList: true
				}).then((updatedMovie) => {
					setTimeout(() => {
						commit('toggleMovieWatchList', movie);
						resolve();
					}, 2500);
				}).catch((error) => {
					reject(error);
				});
			});
		},
		removeMovieFromWatchList({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					watchList: false
				}).then((updatedMovie) => {
					commit('toggleMovieWatchList', movie);
					resolve(updatedMovie);
				}).catch((error) => {
					reject(error);
				});
			});
		},
		removeMovie({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.delete(`/movies/${movie.data._id}`).then((deletedMovie) => {
					setTimeout(() => {
						commit('removeMovie', movie);
						resolve(deletedMovie);
					}, 500);
				}).catch((error) => {
					reject(error);
				});
			});
		}
	},
	root: true
});

export default store;
