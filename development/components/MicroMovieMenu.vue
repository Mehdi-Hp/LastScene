<template>
	<dropdown
		:parentClass="parentClass"
		icon-name="IconMenu"
		:hover-state="hoverState"
		class="o-micro-movie__dropdown"
		:class="{
			'o-micro-movie__dropdown--is-open': movie.openMenu
		}"
		@toggle="toggleMenu"
	>
		<ul>
			<li @click="toggleFavourite()">
				<icon-heart class="m-dropdown__opticon | m-dropdown__opticon--heart" :is-done="movie.favourite" :is-pending="movie.bus.favourite"></icon-heart>
				{{ favouriteText }}
			</li>
			<li @click="toggleWatched()">
				<icon-watch class="m-dropdown__opticon | m-dropdown__opticon--eye " :is-done="movie.watched" :is-pending="movie.bus.watched"></icon-watch>
				{{ watchedText }}
			</li>
			<li @click="toggleWatchList()">
				<icon-list class="m-dropdown__opticon | m-dropdown__opticon--list " :is-done="movie.watchList" :is-pending="movie.bus.watchList"></icon-list>
				{{ watchListText }}
			</li>
			<li>
				Add/Remove from collections
			</li>
			<li @click="removeMovie()">
				Remove
			</li>
		</ul>
	</dropdown>
</template>

<script>
import Dropdown from './Dropdown.vue';
import IconHeart from './icons/Heart.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';

export default {
	name: 'MicroMovieMenu',
	props: [
		'movie',
		'hoverState',
		'parentClass'
	],
	data() {
		return {

		};
	},
	computed: {
		favouriteText() {
			if (!this.movie.favourite) {
				return 'Add to favourites';
			}
			return 'Remove from favourites';
		},
		watchedText() {
			if (!this.movie.watched) {
				return 'Watched it';
			}
			return 'Not watched yet';
		},
		watchListText() {
			if (!this.movie.watchList) {
				return 'Watch next...';
			}
			return 'Not gonna watch soon';
		}
	},
	components: {
		Dropdown,
		IconHeart,
		IconWatch,
		IconList
	},
	methods: {
		toggleMenu(state) {
			this.$emit('toggleMenu', state);
		},
		toggleFavourite() {
			if (!this.movie.favourite) {
				this.$emit('addToFavourites');
			} else {
				this.$emit('removeFromFavourites');
			}
		},
		toggleWatched() {
			if (!this.movie.watched) {
				this.$emit('addToWatched');
			} else {
				this.$emit('removeFromWatched');
			}
		},
		toggleWatchList() {
			if (!this.movie.watchList) {
				this.$emit('addToWatchList');
			} else {
				this.$emit('removeFromWatchList');
			}
		},
		removeMovie() {
			this.$emit('removeMovie', false);
		}
	}
};
</script>
