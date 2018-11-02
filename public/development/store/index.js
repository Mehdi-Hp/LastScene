import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import movies from './modules/movies';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		user,
		movies
	}
});

export default store;
