<template>

</template>

<script>
import EventBus from '../EventBus';
import movieService from '../services/movieService';
import SearchField from './SearchField.vue';

export default {
	name: 'SearchByName',
	props: [
		'initialMovieTitle'
	],
	data() {
		return {
			searchQuery: null || this.initialMovieTitle,
			searchResults: [],
			loading: false
		};
	},
	components: {
		SearchField
	},
	methods: {
		searchForMovie(movieNames) {
			const searchPromises = [];
			movieNames.forEach((movieName) => {
				console.log(`Searching for [${movieName}]`);
				const movie = {};
				movie.loading = true;
				movie.query = movieName;
				this.searchResults.push(movie);
				searchPromises.push(
					movieService.search(movieName, this.$store.state.movies).then((foundedMovies) => {
						movie.loading = false;
						movie.foundedMovies = foundedMovies;
						return movie;
					}).catch((error) => {
						console.log(error);
					})
				);
			});
			Promise.all(searchPromises).then((searchResults) => {
				this.searchResults = searchResults;
				console.log(searchResults);
			});
		}
	},
	mounted() {
		EventBus.$on('searchForMovies', (movieNames) => {
			this.searchForMovie(movieNames);
		});
	}
};
</script>
