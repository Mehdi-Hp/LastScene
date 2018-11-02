/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueEsc from 'vue-esc';
import VueLocalStorage from 'vue-ls';
import Ripple from 'vue-ripple-directive';

import Icon from '@components/1_atoms/Icon.vue';
import AppButton from '@components/1_atoms/AppButton.vue';
import Routes from './routes';
import App from './App.vue';
import store from './store/index';

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

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = '/api';
Vue.axios.defaults.headers = {
	Authorization:
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IkJrY1JVQ0pieiIsInVzZXJuYW1lIjoibWVoZGkifSwiaWF0IjoxNTM0NDc5OTI3fQ.7Yp1_5JaeIxXTy_7r_bbSWX4U0wQrfG6Uc_GaFKVmaI'
};

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
