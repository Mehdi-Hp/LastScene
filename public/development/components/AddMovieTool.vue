<template>
	<div class="m-add-movie-tool">
		<touch-ripple>
			<router-link
				to="/add"
				class="m-add-movie-tool__button | a-button | a-button--plain"
			>
				<icon-film class="m-add-movie-tool__icon"></icon-film>
				<span class="m-add-movie-tool__text">Add Movie</span>
			</router-link>
		</touch-ripple>
	</div>
</template>

<script>
import IconFilm from './icons/Film.vue';

export default {
	name: 'AddMovieTool',
	components: {
		IconFilm
	},
	data() {
		return {};
	}
};
</script>
