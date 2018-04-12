import Vue from 'vue';
import Vuex from 'vuex';
import fastSort from 'fast-sort';
import renameObjectsKeys from './helpers/renameObjectsKeys';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		info: null,
		movies: [],
		collections: []
	},
	getters: {
		movies(state) {
			return ({ watchList }) => {
				return state.movies.filter((movie) => {
					return movie.watchList === watchList;
				});
			};
		},
		movie(state) {
			return (imdbID) => {
				return state.movies.filter((movie) => {
					return movie.data._id === imdbID;
				})[0];
			};
		},
		fakeMovies(state) {
			const fakeMovies = Array.from(Array(15));
			fakeMovies.fill({
				data: {
					title: ''
				},
				bus: {}
			});
			return fakeMovies;
		}
	},
	mutations: {
		setUset(state, user) {
			state.info = Vue.$_.omit(user.data, ['movies', 'lists']);

			state.movies = renameObjectsKeys(user.data.movies, {
				_id: 'data'
			});

			state.movies = fastSort(state.movies).desc((movie) => {
				return movie.createdAt;
			});
			Vue.$_.forEach(state.movies, (movie, key) => {
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

			state.collections = renameObjectsKeys(user.data.lists, {
				_id: 'data'
			});
		},
		pushMovie(state, movie) {
			state.movies.unshift(movie);
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
			const oldMovieIndex = Vue.$_.findIndex(state.movies, {
				data: {
					_id: newMovieData._id
				}
			});
			Vue.set(state.movies, oldMovieIndex, newMovie);
		},
		toggleMovieFavourite(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.movies[theMovieIndex].favourite = !state.movies[theMovieIndex].favourite;
		},
		toggleMovieWatched(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.movies[theMovieIndex].watched = !state.movies[theMovieIndex].watched;
		},
		toggleMovieWatchList(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.movies[theMovieIndex].watchList = !state.movies[theMovieIndex].watchList;
		},
		removeMovie(state, movie) {
			const theMovieIndex = Vue.$_.findIndex(state.movies, {
				data: {
					_id: movie.data._id
				}
			});
			state.movies.splice(theMovieIndex, 1);
		},
		setMovies(state, movies) {
			state.movies = movies;
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
				state.movies = fastSort(state.movies).asc((movie) => {
					return sortCase[sortBy](movie);
				});
			} else if (order === 'desc') {
				state.movies = fastSort(state.movies).desc((movie) => {
					return sortCase[sortBy](movie);
				});
			}
		}
	},
	actions: {
		fetchUser({ commit, state }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get('/user')
					.then((res) => {
						commit('setUset', res.data);
						resolve(res.data);
					})
					.catch((error) => {
						reject(error.response.data);
					});
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
				Vue.$axios
					.post(`/movies/${imdbID}`)
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
					})
					.catch((error) => {
						throw new Error(error);
					});
			});
		},
		addMovieToFavourites({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.put(`/movies/${movie.data._id}`, {
						favourite: true
					})
					.then((updatedMovie) => {
						setTimeout(() => {
							commit('toggleMovieFavourite', movie);
							resolve();
						}, 1500);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		removeMovieFromFavourites({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.put(`/movies/${movie.data._id}`, {
						favourite: false
					})
					.then((updatedMovie) => {
						commit('toggleMovieFavourite', movie);
						resolve(movie.favourite);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		addMovieToWatched({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.put(`/movies/${movie.data._id}`, {
						watched: true
					})
					.then((updatedMovie) => {
						setTimeout(() => {
							commit('toggleMovieWatched', movie);
							resolve();
						}, 1500);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		removeMovieFromWatched({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.put(`/movies/${movie.data._id}`, {
						watched: false
					})
					.then((updatedMovie) => {
						commit('toggleMovieWatched', movie);
						resolve();
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		addMovieToWatchList({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.put(`/movies/${movie.data._id}`, {
						watchList: true
					})
					.then((updatedMovie) => {
						setTimeout(() => {
							commit('toggleMovieWatchList', movie);
							resolve(updatedMovie);
						}, 1500);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		removeMovieFromWatchList({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.put(`/movies/${movie.data._id}`, {
						watchList: false
					})
					.then((updatedMovie) => {
						commit('toggleMovieWatchList', movie);
						resolve(updatedMovie);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		removeMovie({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.delete(`/movies/${movie.data._id}`)
					.then((deletedMovie) => {
						commit('removeMovie', movie);
						resolve(deletedMovie);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		updateMovie({ commit, state }, movieID) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.post(`/movies/${movieID}?force_update=true`)
					.then((updatedMovie) => {
						commit('updateMovieData', updatedMovie.data._id);
						resolve(updatedMovie.data._id);
					})
					.catch((error) => {
						reject(error);
					});
			});
		}
	},
	root: true
});

export default store;
