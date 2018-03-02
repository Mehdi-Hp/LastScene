<template>
	<section class="l-micro-movies" :class="{
			'l-micro-movies--searching': mode === 'search'
		}">

		<transition-group tag="ul" name="flip-list" class="l-micro-movies__holder" v-if="mode !== 'search'">
			<micro-movie v-for="(movie, movieIndex) in movies" :key="movie.data._id" :initial-movie="movie" :loading="movie.data.loading"></micro-movie>
		</transition-group>

		<div class="l-micro-movies__search-row"
			v-if="mode === 'search'"
			v-for="(filteredMovies, filteredMoviesKey, filteredMoviesIndex) in movies"
			:key="filteredMoviesIndex"
		>
			<h3 class="l-micro-movies__title" :class="{
				'l-micro-movies__title--empty': !filteredMovies.length
			}">
				{{ filteredMoviesKey }}
			</h3>
			<span class="l-micro-movies__no-search-result" v-if="!filteredMovies.length">
				No Search Result!
			</span>
			<transition-group tag="ul" name="flip-list" class="l-micro-movies__holder" v-if="mode === 'search'" >
				<micro-movie v-for="movie in filteredMovies" :key="movie.data._id" :initial-movie="movie"></micro-movie>
			</transition-group>

		</div>
	</section>
</template>

<script>
import MicroMovie from './MicroMovie.vue';

export default {
	name: 'microMovies',
	props: [
		'initialMovies',
		'mode'
	],
	data() {
		return {

		};
	},
	computed: {
		movies() {
			return this.initialMovies;
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
