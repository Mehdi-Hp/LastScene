<template>
	<div
		id="app"
		class="p-dashboard"
		v-if="userInfo"
	>
		<div class="p-dashboard__sidebar-holder">
			<sidebar class="p-dashboard__sidebar"></sidebar>
		</div>
		<router-view class="p-dashboard__content"></router-view>
		<!-- <div class="p-dashboard__friends-holder">
			<div class="p-dashboard__friends"></div>
		</div> -->
	</div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
	name: 'Dashboard',
	components: {
		Sidebar
	},
	data() {
		return {};
	},
	computed: {
		userInfo() {
			return this.$store.state.info;
		}
	},
	created() {
		this.axios.defaults.headers = {
			'x-access-token': this.$ls.get('x-access-token')
		};
	},
	mounted() {
		this.$store.dispatch('fetchUser').catch((error) => {
			this.$router.push('/auth/login');
			console.error(error);
		});
	}
};
</script>
