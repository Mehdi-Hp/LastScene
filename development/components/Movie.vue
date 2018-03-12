<template>
	<div class="l-movie">
		<div class="l-movie__backdrop">
			<back class="l-movie__back"></back>
			<img class="l-movie__backdrop-image" :src="`/files/backdrop/${movie.data.images.backdrop.medium}`" alt="">
		</div>
		<movie-essense
			class="l-movie__essense"
			:movie="movie"
			@toggleFavourite="toggleFavourite"
		></movie-essense>
		<movie-information class="l-movie__information" :movie="movie"></movie-information>
	</div>
</template>

<script>
import movieService from '../services/movieService';
import Back from './Back.vue';
import MovieEssense from './MovieEssense.vue';
import MovieInformation from './MovieInformation.vue';

export default {
	name: 'Movie',
	data() {
		return {

		};
	},
	computed: {
		movie() {
			return this.$store.getters.movie(this.$route.params.movie_id);
		}
	},
	components: {
		Back,
		MovieEssense,
		MovieInformation
	},
	methods: {
		toggleFavourite() {
			movieService.toggleFavourite(this.movie);
		}
	}
};
</script>
