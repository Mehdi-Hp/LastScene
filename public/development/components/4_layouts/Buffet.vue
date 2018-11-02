<template>
	<section class="buffet">
		<buffet-tools class="buffet__tools"/>
		<article class="buffet__mini-movies">
			<mini-movie
				class="buffet__mini-movie"
				v-for="movie in movies.list"
				:key="movie.id"
				:title="movie.information.originalTitle || movie.information.title"
				:year="movie.information.year"
				:director="movie.information.directors[0]"
				:poster="movie.information.images.poster"
				:rate="movie.information.rate.imdb"
				:heart="movie.favourite"
				:watched="movie.watched"
				:later="movie.watchList"
			/>
		</article>
	</section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

const BuffetTools = () => {
	return import('@components/2_molecules/BuffetTools.vue');
};
const MiniMovie = () => {
	return import('@components/3_organisms/MiniMovie.vue');
};

export default {
	name: 'Buffet',
	components: {
		BuffetTools,
		MiniMovie
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			movies: 'movies/allMovies'
		}),
		...mapState({
			username: (state) => {
				return state.user.username;
			}
		})
	},
	mounted() {
		this.getAllMovies();
	},
	methods: {
		getAllMovies() {
			console.log(this.username);
			this.$store.dispatch('movies/getAll', this.username);
		}
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
		padding-left: $gutter--fat;
		padding-right: $gutter;
		box: horizontal wrap;
	}

	&__mini-movie {
		margin-right: $gutter--fat;
		margin-bottom: $gutter--fat;
	}
}
</style>
