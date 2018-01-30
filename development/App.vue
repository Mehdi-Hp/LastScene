<template>
	<main id="app" v-if="user" class="p-dashboard">
		<div class="p-dashboard__sidebar-holder">
			<sidebar class="p-dashboard__sidebar"></sidebar>
		</div>
		<buffet class="p-dashboard__buffet"></buffet>
		<div class="p-dashboard__friends"></div>
	</main>
</template>

<script>
import sidebar from './components/Sidebar.vue';
import buffet from './components/Buffet.vue';

import './assets/notcss/01_atom/atoms.scss';
import './assets/notcss/02_molecule/molecules.scss';
import './assets/notcss/03_organism/organisms.scss';
import './assets/notcss/04_layout/layouts.scss';
import './assets/notcss/05_page/pages.scss';


export default {
	name: 'app',
	data() {
		return {

		};
	},
	components: {
		sidebar,
		buffet
	},
	computed: {
		user() {
			return this.$store.state.user;
		}
	},
	mounted() {
		this.$store.dispatch('fetchUser');
	},
	watch: {
		// user: {
		// 	handler(newValue, oldVali) {
		// 		console.log(newValue);
		// 	},
		// 	deep: true
		// }
	}
};
</script>
