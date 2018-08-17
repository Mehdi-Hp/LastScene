<template>
	<div
		class="dashboard"
	>
		<app-sidebar class="dashboard__sidebar"/>
		<search-bar
			class="dashboard__searchbar"
		/>
		<div class="dashboard__content">
			<page-info class="dashboard__pageinfo" />
			<router-view />
		</div>
	</div>
</template>

<script>
const AppSidebar = () => {
	return import('@/components/04_layout/Sidebar.vue');
};
const SearchBar = () => {
	return import('@@/02_molecules/SearchBar.vue');
};
const PageInfo = () => {
	return import('@@/03_organisms/PageInfo.vue');
};

export default {
	name: 'Dashboard',
	components: {
		AppSidebar,
		SearchBar,
		PageInfo
	},
	data() {
		return {};
	},
	computed: {},
	created() {
		this.axios.defaults.headers = {
			'x-access-token': this.$ls.get('x-access-token')
		};
	},
	mounted() {
		this.$store.dispatch('user/fetchUser').catch((error) => {
			console.error(error);
		});
	}
};
</script>

<style scoped lang="scss">
.dashboard {
	min-width: 100%;
	min-height: 100vh;
	display: flex;
	background-image: $background-gradient;
	padding-top: $searchbar-height;
	padding-left: $sidebar-width;

	&__sidebar {
		position: fixed 0 auto 0 0;
	}

	&__searchbar {
	}

	&__content {
		width: 100%;
		padding-top: $gutter--fat;
		padding-left: $gutter;
		padding-right: $gutter--fat;
	}

	&__pageinfo {
		margin-bottom: $gutter;
	}
}
</style>
