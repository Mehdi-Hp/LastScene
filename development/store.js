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
			state.user.collections = renameObjectsKeys(user.data.lists, {
				_id: 'data'
			});
		}
	},
	actions: {
		fetchUser(context) {
			Vue.$axios.get('/user').then((user) => {
				context.commit('setUset', user.data);
			}).catch((error) => {
				console.log(error);
			});
		}
	},
	strict: process.env.NODE_ENV !== 'production'
});

export default store;
