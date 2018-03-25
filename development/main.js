/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import LodashForVue from 'lodash-for-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueEsc from 'vue-esc';
import VueTippy from 'vue-tippy';
import umbrellajs from 'umbrellajs';
import VueLocalStorage from 'vue-ls';
import Overdrive from 'vue-overdrive';
import App from './App.vue';
import Routes from './routes';
import invertColor from './helpers/invertColor';
import store from './store';

Vue.use(LodashForVue);
Vue.prototype.$_ = Vue.$lodash;
Vue.$_ = Vue.$lodash;

Vue.use(VueEsc);
Vue.use(VueTippy, {
	arrow: true,
	arrowType: 'round',
	duration: 200
});

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'history',
	routes: Routes,
	beforeEach: () => {
		console.log('test');
	},
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return {
			x: 0,
			y: 0
		};
	}
});
router.beforeEach((to, from, next) => {
	router.lastRoute = from.fullPath;
	next();
});

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = '/api/v1';
Vue.$axios = Vue.axios;
Vue.prototype.$axios = Vue.axios;
Vue.prototype.$invertColor = invertColor;

Object.defineProperty(Vue.prototype, '$u', { value: umbrellajs.u });

Vue.use(VueLocalStorage);

Vue.use(Overdrive);

new Vue({
	el: '#app',
	render: (h) => h(App),
	store,
	router,
	performance: true,
	productionTip: false
});
