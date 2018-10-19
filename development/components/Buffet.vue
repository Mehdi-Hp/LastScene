<template>
	<section class="buffet">
		<buffet-tools class="buffet__tools"/>
		<mini-movies
			class="buffet__mini-movies"
		/>
	</section>
</template>

<script>
const BuffetTools = () => {
	return import('@@/02_molecules/BuffetTools.vue');
};
const MiniMovies = () => {
	return import('@@/04_layout/MiniMovies.vue');
};
// import _ from 'lodash';
// import MicroMovies from './MicroMovies.vue';

export default {
	name: 'Buffet',
	components: {
		BuffetTools,
		MiniMovies
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
		margin-bottom: $gutter--fat;
	}

	&__mini-movies {
		margin-bottom: $gutter--fat;
	}
}
</style>
