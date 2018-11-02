import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		list: []
	},
	getters: {
		allMovies(state) {
			const movies = {
				totalCount: state.list.length,
				list: state.list
			};
			return movies;
		}
	},
	mutations: {
		setAll(state, movies) {
			console.log(movies);
			state.list = movies;
		}
	},
	actions: {
		getAll({ commit, state }, username) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.get(`users/mehdi_hp/movies`)
					.then(({ data: movies }) => {
						console.table(movies.data);
						commit('setAll', movies.data);
					})
					.catch(() => {});
			});
		}
	}
};
