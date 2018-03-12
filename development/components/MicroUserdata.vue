<template>
	<div class="m-micro-userdata" v-if="movie.favourite || movie.watched || movie.watchList">
		<div class="m-micro-userdata__background" :style="{
			'background-image': `url(${movie.data.images.poster.small})`
		}"
		></div>
		<icon-heart v-if="movie.favourite" :is-done="true" class="m-micro-userdata__icon | m-micro-userdata__icon--heart" custom-color="true"></icon-heart>
		<icon-eye v-if="movie.watched" :is-done="true" class="m-micro-userdata__icon | m-micro-userdata__icon--eye" custom-color="true"></icon-eye>
		<icon-flag v-if="movie.watchList" :is-done="true" class="m-micro-userdata__icon | m-micro-userdata__icon--flag" custom-color="true"></icon-flag>
	</div>
</template>

<script>
import IconHeart from './icons/Heart.vue';
import IconEye from './icons/Eye.vue';
import IconFlag from './icons/Flag.vue';

export default {
	name: 'MicroUserdata',
	props: [
		'movie'
	],
	data() {
		return {

		};
	},
	computed: {

	},
	components: {
		IconHeart,
		IconEye,
		IconFlag
	},

	methods: {

	}
};
</script>
