<template>
	<main id="app" class="p-app">
		<div class="p-app__sidebar-holder">
			<sidebar class="p-app__sidebar"></sidebar>
		</div>
		<router-view class="p-app__content"></router-view>
		<div class="p-app__friends-holder">
			<div class="p-app__friends"></div>
		</div>
	</main>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

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
		Sidebar
	},
	mounted() {
		this.$store.dispatch('fetchUser');
	}
};
</script>
