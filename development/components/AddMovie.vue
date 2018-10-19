<template>
	<transition
		enter-active-class="l-add-movie-holder--is-enter-active"
		leave-active-class="l-add-movie-holder--is-leave-active"
	>
		<div
			class="l-add-movie-holder"
		>
			<div class="l-add-movie">
				<div class="l-add-movie__navigation">
					<back class="l-add-movie__back"></back>
				</div>
				<div class="l-add-movie__search | l-add-movie__search--name">
					<span class="l-add-movie__title">
						Search for a Single Movie
					</span>
					<search-field
						v-if="!searchResults.length"
						:loading="false"
						:search-result="[]"
					></search-field>
					<search-field
						v-if="searchResults.length"
						v-for="(searchResult, searchResultIndex) in searchResults"
						:key="searchResultIndex"
						:field-index="searchResultIndex"
						:search-result="searchResult"
						:loading="searchResult.loading"
					></search-field>
				</div>
				<div class="l-add-movie__search | l-add-movie__search--folder">
					<span class="l-add-movie__title">
						Search for Multiple Movies at Once
					</span>
					<span class="l-add-movie__sub-title">
						By dropping your movie folder down there
					</span>
					<search-drop
						class="l-add-movie__drop"
						@gotMovies="gotQueries"
					></search-drop>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import EventBus from '../EventBus';
import Back from './Back.vue';
import SearchField from './SearchField.vue';
import SearchDrop from './SearchDrop.vue';
import movieService from '../services/movieService';

export default {
	name: 'AddMovie',
	components: {
		Back,
		SearchDrop,
		SearchField
	},
	data() {
		return {
			searchQuery: null,
			searchResults: []
		};
	},
	mounted() {
		EventBus.$on('searchForMovies', (data) => {
			this.gotQuery(data.searchQuery, data.index);
		});
	},
	methods: {
		clearSearchResults() {
			this.searchResults = [];
		},
		gotQueries(movieNames) {
			this.clearSearchResults();
			console.log(movieNames);
			const nextQuery = (movieNames, i) => {
				let n = i;
				this.searchResults[n] = this.searchForMovie(movieNames[n]);
				this.searchResults[n].results
					.then((results) => {
						this.searchResults[n].results = results;
						this.$forceUpdate();
						if (n < movieNames.length - 1) {
							nextQuery(movieNames, ++n);
						}
					})
					.catch((error) => {});
			};
			movieNames.forEach((searchQuery) => {
				this.searchResults.push({
					loading: true,
					query: searchQuery,
					results: []
				});
			});
			nextQuery(movieNames, 0);
		},
		gotQuery(movieName, resultsIndex = 0) {
			this.searchResults[resultsIndex] = this.searchForMovie(movieName);
			this.$set(this.searchResults[resultsIndex], 'submitted', true);
			this.searchResults[resultsIndex].results
				.then((results) => {
					this.$set(this.searchResults[resultsIndex], 'results', results);
					this.$forceUpdate();
				})
				.catch((error) => {
					console.log(error);
					this.$set(this.searchResults[resultsIndex], 'results', null);
				});
			this.$forceUpdate();
		},
		searchForMovie(searchQuery) {
			const movie = {
				loading: true,
				query: searchQuery,
				results: []
			};
			movie.results = new Promise((resolve, reject) => {
				movieService
					.search(searchQuery, this.$store.state.movies)
					.then((foundedMovies) => {
						movie.loading = false;
						resolve(foundedMovies);
					})
					.catch((error) => {
						reject(error);
					});
			});
			return movie;
		}
	}
};
</script>
