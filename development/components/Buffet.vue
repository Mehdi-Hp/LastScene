<template>
	<section class="l-buffet">
		<search-bar
			class="l-buffet__searchbar"
			@search="search"
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
	methods: {
		search(searchQuery = '') {
			if (!searchQuery.length) {
				this.filteredMovies = null;
				return;
			}
			this.filteredMovies = {
				title: _.filter(this.movies, (movie) => {
					return movie.data.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || movie.data.originalTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
				}),
				year: _.filter(this.movies, (movie) => {
					return movie.data.year === searchQuery;
				}),
				directors: _.filter(this.movies, (movie) => {
					let includeState = false;
					movie.data.directors.forEach((director) => {
						includeState = director.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
					});
					return includeState;
				}),
				awards: _.filter(this.movies, (movie) => {
					return movie.data.awards.some((award) => {
						return `${award.name} ${award.year}`.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
					});
				})
			};
		}
	}
};
</script>
