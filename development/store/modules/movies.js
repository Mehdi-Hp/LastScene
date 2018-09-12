import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		list: [] // ORM here
	},
	getters: {},
	mutations: {
		setAll(state, movies) {
			console.log(movies);
			state.list = movies;
		}
	},
	actions: {
		getAll({ commit, state }) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.get('/movies')
					.then(({ data: movies }) => {
						console.table(movies.data);
						commit('setAll', movies.data);
					})
					.catch(() => {});
			});
		}
	}
};
