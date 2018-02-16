<template>
	<main id="app">
		<router-view name="dashboard"></router-view>
	</main>
</template>

<script>
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
	mounted() {
		this.$store.dispatch('fetchUser');
	}
};
</script>
