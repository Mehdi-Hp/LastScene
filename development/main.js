/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import LodashForVue from 'lodash-for-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueEsc from 'vue-esc';
import VueTippy from 'vue-tippy';
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
	routes: Routes
});

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = '/api/v1';
Vue.axios.defaults.headers = {
	'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IkJrY1JVQ0pieiIsInVwZGF0ZWRBdCI6IjIwMTctMTItMDJUMDc6MzE6MzAuMjk3WiIsImNyZWF0ZWRBdCI6IjIwMTctMTItMDJUMDc6MzE6MzAuMjk3WiIsIm5hbWUiOiJNZWhkaSBIb3NlaW5pIiwidXNlcm5hbWUiOiJtZWhkaSIsIl9fdiI6MCwibGlzdHMiOltdLCJtb3ZpZXMiOltdLCJhdXRoZW50aWNhdGlvbiI6eyJsb2NhbCI6eyJwYXNzd29yZCI6IiQyYSQwOCRyNVlqN0ZpVGQ2RS84Y1A0SW1FTzZlR1hmUC9jY1cud2JISUFvUDNGUmdwYmUxUzdWL2MzLiIsImVtYWlsIjoibWVoZGkuaG9zZWluaXBham9vaEBnbWFpbC5jb20ifX19LCJpYXQiOjE1MTIyMDAzMzJ9.ck9x7Xa2dG_Lx_Ere_-tklhRWjz0TEnPK6HILA1UG4o'
};
Vue.$axios = Vue.axios;
Vue.prototype.$axios = Vue.axios;

Vue.prototype.$invertColor = invertColor;


new Vue({
	el: '#app',
	render: h => h(App),
	store,
	router,
	performance: true,
	productionTip: false
});
