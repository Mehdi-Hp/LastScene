import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		name: null,
		email: 'mehdi.hoseinipajooh@gmail.com',
		username: 'mehdi_hp',
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
		setUser(state, { name, username, avatar }) {
			Vue.axios.defaults.headers = {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IkJrY1JVQ0pieiIsInVzZXJuYW1lIjoibWVoZGkifSwiaWF0IjoxNTM0NDc5OTI3fQ.7Yp1_5JaeIxXTy_7r_bbSWX4U0wQrfG6Uc_GaFKVmaI'
			};
			state.name = name;
			state.username = username;
			state.picture = avatar;
		}
	},
	actions: {
		fetch({ commit, state }) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.get('/users/mehdi_hp')
					.then(({ data: user }) => {
						console.table(user);
						commit('setUser', user);
						resolve(user);
					})
					.catch((error) => {
						reject(error);
					});
			});
		}
	}
};
