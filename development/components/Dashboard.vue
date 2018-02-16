<template>
	<div class="p-dashboard">
		<div class="p-dashboard__sidebar-holder">
			<sidebar class="p-dashboard__sidebar"></sidebar>
		</div>
		<buffet class="p-dashboard__buffet"></buffet>
		<div class="p-dashboard__friends-holder">
			<div class="p-dashboard__friends"></div>
		</div>
	</div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Buffet from './Buffet.vue';

export default {
	name: 'Dashboard',
	data() {
		return {

		};
	},
	components: {
		Sidebar,
		Buffet
	},
	computed: {
		user() {
			return this.$store.state.user;
		}
	}
};
</script>
