<template>
	<section
		class="l-micro-movies"
		:class="{
			'l-micro-movies--searching': mode === 'search'
		}"
	>

		<transition-group
			tag="ul"
			name="flip-list"
			class="l-micro-movies__holder"
			v-if="mode !== 'search'"
		>
			<micro-movie
				v-for="movie in movies"
				:key="movie.data._id"
				:initial-movie="movie"
				:loading="movie.data.loading"
				class="l-micro-movies__movie"
			></micro-movie>
		</transition-group>

		<div
			class="l-micro-movies__search-row-holder"
			v-if="mode === 'search'"
		>
			<div
				class="l-micro-movies__search-row"
				v-for="(filteredMovies, filteredMoviesKey, filteredMoviesIndex) in movies"
				:key="filteredMoviesIndex"
			>
				<h3
					class="l-micro-movies__title"
					:class="{
						'l-micro-movies__title--empty': !filteredMovies.length
					}"
				>
					{{ filteredMoviesKey }}
				</h3>
				<span
					class="l-micro-movies__no-search-result"
					v-if="!filteredMovies.length"
				>
					No Search Result!
				</span>
				<transition-group
					tag="ul"
					name="flip-list"
					class="l-micro-movies__holder"
					v-if="mode === 'search'"
				>
					<micro-movie
						v-for="movie in filteredMovies"
						:key="movie.data._id"
						:initial-movie="movie"
					></micro-movie>
				</transition-group>
			</div>
		</div>

		<ul
			class="l-micro-movies__holder | l-micro-movies__holder--is-empty"
			v-if="!movies.length || !movies"
		>
			<micro-movie
				v-for="(fakeMovie, movieIndex) in fakeMovies"
				:key="movieIndex"
				:initial-movie="fakeMovie"
				is-fake="true"
			></micro-movie>
		</ul>
		<div
			class="l-micro-movies__what-to-do"
			v-if="!movies.length || !movies"
		>
			<span class="l-micro-movies__what-to-do-text">No movies in your archive yet.</span>
			<router-link
				to="/add"
				class="l-micro-movies__what-to-do-link | a-button"
			>
				Add some
			</router-link>
			<span class="l-micro-movies__what-to-do-text">to manage them.</span>
		</div>
	</section>
</template>

<script>
import MicroMovie from './MicroMovie.vue';

export default {
	name: 'MicroMovies',
	components: {
		MicroMovie
	},
	props: ['initialMovies', 'mode'],
	data() {
		return {
			fakeMovies: this.$store.getters.fakeMovies
		};
	},
	computed: {
		movies() {
			return this.initialMovies;
		}
	},
	created() {
		this.$on('addToFavourites', function(movie) {
			movie.bus.favourite = true;
			this.$store
				.dispatch('addMovieToFavourites', movie)
				.then((updatedMovie) => {
					movie.bus.favourite = false;
				})
				.catch((error) => {
					console.error(error);
				});
		});
		this.$on('removeFromFavourites', function(movie) {
			movie.bus.favourite = true;
			this.$store
				.dispatch('removeMovieFromFavourites', movie)
				.then((updatedMovie) => {
					movie.bus.favourite = false;
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}
};
</script>
