<template>
	<div class="l-movie">
		<div class="l-movie__backdrop">
			<back class="l-movie__back"></back>
			<img class="l-movie__backdrop-image" :src="`/files/backdrop/${movie.data.images.backdrop.medium}`" alt="">
		</div>
	</div>
</template>

<script>
import Back from './Back.vue';

export default {
	name: 'Dashboard',
	data() {
		return {

		};
	},
	computed: {
		movie() {
			return this.$store.getters.movie(this.$route.params.movie_id);
		}
	},
	components: {
		Back
	}
};
</script>
