<template>
	<div class="m-micro-userdata" v-if="movie.favourite || movie.watched || movie.watchList">
		<div class="m-micro-userdata__background" :style="{
			'background-image': `url(${movie.data.images.poster.small})`
		}"
		></div>
		<icon-heart v-if="movie.favourite" :is-done="true" class="m-micro-userdata__icon | m-micro-userdata__icon--heart" custom-color="true"></icon-heart>
		<icon-watch v-if="movie.watched" :is-done="true" class="m-micro-userdata__icon | m-micro-userdata__icon--watch" custom-color="true"></icon-watch>
		<icon-list v-if="movie.watchList" :is-done="true" class="m-micro-userdata__icon | m-micro-userdata__icon--list" custom-color="true"></icon-list>
	</div>
</template>

<script>
import IconHeart from './icons/Heart.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';

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
		IconWatch,
		IconList
	},

	methods: {

	}
};
</script>
