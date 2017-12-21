import Vue from 'vue';
import Vuex from 'vuex';
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
	mutations: {
		setUset(state, user) {
			state.user.info = Vue.$_.omit(user.data, ['movies', 'lists']);
			state.user.movies = renameObjectsKeys(user.data.movies, {
				_id: 'data'
			});
			Vue.$_.forEach(state.user.movies, (movie, key) => {
				movie.hovered = false;
				movie.bus = {
					favourite: false,
					watched: false,
					watchList: false
				};
			});
			state.user.collections = renameObjectsKeys(user.data.lists, {
				_id: 'data'
			});
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
		}
	},
	actions: {
		fetchUser({ commit, state }) {
			Vue.$axios.get('/user').then((user) => {
				commit('setUset', user.data);
			}).catch((error) => {
				console.log(error);
			});
		},
		addMovieToFavourites({ commit, state }, movie) {
			return new Promise((resolve, reject) => {
				Vue.$axios.put(`/movies/${movie.data._id}`, {
					favourite: true
				}).then((updatedMovie) => {
					setTimeout(function () {
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
					setTimeout(function () {
						commit('toggleMovieWatched', movie);
						resolve();
					}, 2000);
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
		}
	}
});

export default store;
