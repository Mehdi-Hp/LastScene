<template>
	<section class="l-buffet">
		<micro-movies class="l-buffet__micro-movies" :movies="movies"></micro-movies>
	</section>
</template>

<script>
import microMovies from './MicroMovies.vue';
import '../assets/notcss/04_layout/l-buffet.scss';

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
