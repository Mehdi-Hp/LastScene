<template>
	<section class="l-buffet">
		<micro-movies class="l-buffet__micro-movies" :initial-movies="movies"></micro-movies>
	</section>
</template>

<script>
import microMovies from './MicroMovies.vue';

export default {
	name: 'buffet',
	data() {
		return {

		};
	},
	computed: {
		movies() {
			return this.$store.state.user.movies;
		}
	},
	components: {
		microMovies
	}
};
</script>
