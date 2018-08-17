<template>
	<component :is="`icon-${name}`"/>
</template>

<script>
const IconBox = () => {
	return import('@/components/icons/Archive.vue');
};
const IconClock = () => {
	return import('@/components/icons/Clock.vue');
};
const IconSearch = () => {
	return import('@/components/icons/Search.vue');
};
const IconMovie = () => {
	return import('@/components/icons/Movie.vue');
};
const IconSort = () => {
	return import('@/components/icons/Sort.vue');
};
export default {
	name: 'Icon',
	components: {
		IconBox,
		IconSearch,
		IconClock,
		IconMovie,
		IconSort
	},
	props: {
		name: {
			type: String,
			required: true
		}
	}
};
</script>
