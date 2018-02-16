<template>
	
</template>

<script>
import EventBus from '../EventBus';
import SearchDrop from './SearchDrop.vue';

export default {
	name: 'SearchByFolder',
	data() {
		return {

		};
	},
	components: {
		SearchDrop
	},
	methods: {
		gotMovies(moviesName) {
			EventBus.$emit('searchForMovies', moviesName);
		}
	}
};
</script>
