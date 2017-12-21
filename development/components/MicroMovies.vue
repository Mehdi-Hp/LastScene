<template>
	<section class="l-micro-movies">
		<micro-movie v-for="movie in movies" :key="movie.key" :initial-movie="movie"></micro-movie>
	</section>
</template>

<script>
import MicroMovie from './MicroMovie.vue';

export default {
	name: 'microMovies',
	props: [
		'initialMovies'
	],
	data() {
		return {
			movies: this.initialMovies
		};
	},
	computed: {

	},
	watch: {
		initialMovies() {
			this.$set(this, 'movies', this.initialMovies);
		}
	},
	components: {
		MicroMovie
	},
	methods: {

	},
	created() {
		this.$on('addToFavourites', function(movie) {
			movie.bus.favourite = true;
			this.$store.dispatch('addMovieToFavourites', movie).then((updatedMovie) => {
				movie.bus.favourite = false;
			});
		});
		this.$on('removeFromFavourites', function(movie) {
			movie.bus.favourite = true;
			this.$store.dispatch('removeMovieFromFavourites', movie).then((updatedMovie) => {
				movie.bus.favourite = false;
			});
		});
	}
};
</script>
