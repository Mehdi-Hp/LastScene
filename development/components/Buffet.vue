<template>
	<section class="buffet">
		<buffet-tools class="buffet__tools"/>
		<!-- <micro-movies
			:mode="(filteredMovies) ? 'search' : null"
			:initial-movies="(!filteredMovies) ? movies : filteredMovies"
			class="l-buffet__micro-movies"
		/> -->
	</section>
</template>

<script>
const BuffetTools = () => {
	return import('@@/02_molecules/BuffetTools.vue');
};
// import _ from 'lodash';
// import MicroMovies from './MicroMovies.vue';

export default {
	name: 'Buffet',
	components: {
		BuffetTools
		// MicroMovies
	},
	data() {
		return {
			// searchQuery: '',
			// filteredMovies: null
		};
	},
	computed: {
		// movies() {
		// 	if (this.watchNextMode) {
		// 		return this.$store.getters.movies({
		// 			watchList: true
		// 		});
		// 	}
		// 	return this.$store.state.movies;
		// }
	},
	watch: {
		// $route() {
		// 	this.searchQuery = '';
		// },
		// searchQuery() {
		// 	if (!this.searchQuery.length) {
		// 		this.filteredMovies = null;
		// 		return;
		// 	}
		// 	this.filteredMovies = {
		// 		title: _.filter(this.movies, (movie) => {
		// 			return (
		// 				movie.data.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()) || movie.data.originalTitle.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
		// 			);
		// 		}),
		// 		year: _.filter(this.movies, (movie) => {
		// 			return movie.data.year === this.searchQuery;
		// 		}),
		// 		directors: _.filter(this.movies, (movie) => {
		// 			let includeState = false;
		// 			movie.data.directors.forEach((director) => {
		// 				includeState = director.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase());
		// 			});
		// 			return includeState;
		// 		}),
		// 		awards: _.filter(this.movies, (movie) => {
		// 			return movie.data.awards.full.some((award) => {
		// 				return `${award.name} ${award.year}`.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase());
		// 			});
		// 		})
		// 	};
		// }
	}
};
</script>

<style scoped lang="scss">
.buffet {
	&__tools {
	}
}
</style>
