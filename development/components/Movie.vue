<template>
	<div class="l-movie">
		<div class="l-movie__backdrop">
			<headroom
				:up-tolerance="10"
				:down-tolerance="10"
			>
				<back class="l-movie__back"/>
			</headroom>
			<img
				:src="`/files/backdrop/${movie.data.images.backdrop}?height=600`"
				class="l-movie__backdrop-image"
				alt=""
			>
		</div>
		<movie-essense
			:movie="movie"
			class="l-movie__essense"
			@toggleFavourite="toggleFavourite"
			@toggleWatched="toggleWatched"
			@toggleWatchList="toggleWatchList"
		/>
		<movie-information
			:movie="movie"
			class="l-movie__information"
		></movie-information>
	</div>
</template>

<script>
import { headroom } from 'vue-headroom';
import movieService from '../services/movieService';
import Back from './Back.vue';
import MovieEssense from './MovieEssense.vue';
import MovieInformation from './MovieInformation.vue';

export default {
	name: 'Movie',
	components: {
		headroom,
		Back,
		MovieEssense,
		MovieInformation
	},
	data() {
		return {};
	},
	computed: {
		movie() {
			return this.$store.getters.movie(this.$route.params.movie_id);
		}
	},
	methods: {
		toggleFavourite() {
			movieService.toggleFavourite(this.movie);
		},
		toggleWatched() {
			movieService.toggleWatched(this.movie);
		},
		toggleWatchList() {
			movieService.toggleWatchList(this.movie);
		}
	}
};
</script>
