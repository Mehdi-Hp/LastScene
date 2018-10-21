/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueEsc from 'vue-esc';
import umbrellajs from 'umbrellajs';
import VueLocalStorage from 'vue-ls';
import VueTouchRipple from 'vue-touch-ripple';
import Ripple from 'vue-ripple-directive';

import Routes from './routes';
import App from './App.vue';
import store from './store/index';
import Icon from './components/01_atoms/Icon.vue';
import AppButton from './components/01_atoms/AppButton.vue';

Vue.use(VueEsc);

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'history',
	routes: Routes,
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
Vue.prototype.$axios = Vue.axios;

Object.defineProperty(Vue.prototype, '$u', { value: umbrellajs.u });

Vue.use(VueTouchRipple, {
	color: '#fff',
	opacity: 0.3,
	speed: 3,
	transition: 'ease-in-out'
});

Vue.use(VueLocalStorage);

Vue.directive('ripple', Ripple);

Vue.component('Icon', Icon);
Vue.component('AppButton', AppButton);

new Vue({
	el: '#app',
	render: (h) => h(App),
	store,
	router,
	performance: true,
	productionTip: false
});
