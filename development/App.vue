<template>
	<main id="app" v-if="user">
		<sidebar></sidebar>
		<buffet class="p-dashboard__buffet"></buffet>
	</main>
</template>

<script>
import sidebar from './components/Sidebar.vue';
import buffet from './components/Buffet.vue';

import './assets/notcss/05_page/p-dashboard.scss';

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
	created() {
		this.$store.dispatch('fetchUser');
	}
};
</script>
