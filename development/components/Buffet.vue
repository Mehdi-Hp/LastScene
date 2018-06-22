<template>
	<section class="l-buffet">
		<search-bar
			class="l-buffet__searchbar"
			:search-query="searchQuery"
			@inputChange="(query) => searchQuery = query"
		></search-bar>
		<buffet-tools class="l-buffet__tools"></buffet-tools>
		<keep-alive>
			<router-view name="addMovie"></router-view>
		</keep-alive>
		<micro-movies
			class="l-buffet__micro-movies"
			:initial-movies="(!filteredMovies) ? movies : filteredMovies"
			:mode="(filteredMovies) ? 'search' : null"
		></micro-movies>
	</section>
</template>

<script>
import _ from 'lodash';
import MicroMovies from './MicroMovies.vue';
import SearchBar from './SearchBar.vue';
import BuffetTools from './BuffetTools.vue';

export default {
	name: 'Buffet',
	components: {
		SearchBar,
		BuffetTools,
		MicroMovies
	},
	props: ['watchNextMode'],
	data() {
		return {
			searchQuery: '',
			filteredMovies: null
		};
	},
	computed: {
		movies() {
			if (this.watchNextMode) {
				return this.$store.getters.movies({
					watchList: true
				});
			}
			return this.$store.state.movies;
		}
	},
	watch: {
		$route() {
			this.searchQuery = '';
		},
		searchQuery() {
			if (!this.searchQuery.length) {
				this.filteredMovies = null;
				return;
			}
			this.filteredMovies = {
				title: _.filter(this.movies, (movie) => {
					return (
						movie.data.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()) || movie.data.originalTitle.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
					);
				}),
				year: _.filter(this.movies, (movie) => {
					return movie.data.year === this.searchQuery;
				}),
				directors: _.filter(this.movies, (movie) => {
					let includeState = false;
					movie.data.directors.forEach((director) => {
						includeState = director.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase());
					});
					return includeState;
				}),
				awards: _.filter(this.movies, (movie) => {
					return movie.data.awards.full.some((award) => {
						return `${award.name} ${award.year}`.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase());
					});
				})
			};
		}
	}
};
</script>
