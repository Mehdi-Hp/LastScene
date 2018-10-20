import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		name: null,
		email: 'mehdi.hoseinipajooh@gmail.com',
		username: null,
		picture: null,
		statistics: {
			moviesCount: 34,
			collectionsCount: 12,
			followingCount: 46,
			followersCount: 80
		}
	},
	getters: {},
	mutations: {
		setUser(state, { data: { name, username, avatar } }) {
			state.name = name;
			state.username = username;
			state.picture = avatar;
		}
	},
	actions: {
		fetchUser({ commit, state }) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.get('/user')
					.then(({ data: user }) => {
						console.table(user);
						commit('setUser', user);
						resolve(user);
					})
					.catch(({ response }) => {
						reject(response.data);
					});
			});
		}
	}
};
