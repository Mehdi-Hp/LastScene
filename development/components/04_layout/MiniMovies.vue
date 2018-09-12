<template>
	<section class="mini-movies">
		<!-- <mini-movie
			class="mini-movies__mini-movie"
			:cover="null"
		/> -->
	</section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'MiniMovies',
	data() {
		return {};
	},
	computed: {
		// ...mapGetters(['movies/getFiltered'])
	},
	mounted() {
		this.$store.dispatch('movies/getAll');
	}
};
</script>

<style scoped lang="scss">
.mini-movies {
	box: horizontal wrap;

	&__mini-movie {
	}
}
</style>
