<template>
	<div class="dashboard">
		<app-sidebar class="dashboard__sidebar"/>
		<search-bar class="dashboard__searchbar"/>
		<div class="dashboard__content">
			<page-info class="dashboard__pageinfo" />
			<router-view />
		</div>
	</div>
</template>

<script>
const AppSidebar = () => {
	return import('@components/4_layouts/Sidebar.vue');
};
const SearchBar = () => {
	return import('@components/3_organisms/SearchBar.vue');
};
const PageInfo = () => {
	return import('@components/3_organisms/PageInfo.vue');
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
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IkJrY1JVQ0pieiIsInVzZXJuYW1lIjoibWVoZGkifSwiaWF0IjoxNTM0NDc5OTI3fQ.7Yp1_5JaeIxXTy_7r_bbSWX4U0wQrfG6Uc_GaFKVmaI'
		};
	},
	mounted() {
		this.$store.dispatch('user/fetch').catch((error) => {
			console.error(error);
		});
	}
};
</script>

<style scoped lang="scss">
.dashboard {
	min-height: 100vh;
	display: flex;
	background-image: $background-gradient;
	padding-top: $searchbar__height;
	min-width: 100%;
	padding-left: $sidebar__width;

	&__sidebar {
		position: fixed 0 auto 0 0;
	}

	&__searchbar {
		box-shadow: $searchbar__box-shadow;
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
