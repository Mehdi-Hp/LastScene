<template>
	<div class="l-movie">
		<div class="l-movie__backdrop">
		</div>
	</div>
</template>

<script>

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
	}
};
</script>
