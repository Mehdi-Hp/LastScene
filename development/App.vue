<template>
	<main id="app">
		<router-view></router-view>
	</main>
</template>

<script>
import './assets/notcss/00_base/base.scss';
import './assets/notcss/01_atom/atoms.scss';
import './assets/notcss/02_molecule/molecules.scss';
import './assets/notcss/03_organism/organisms.scss';
import './assets/notcss/04_layout/layouts.scss';
import './assets/notcss/05_page/pages.scss';

export default {
	name: 'App',
	data() {
		return {};
	},
	created() {
		this.axios.defaults.headers = {
			'x-access-token': this.$ls.get('x-access-token')
		};
	}
};
</script>
