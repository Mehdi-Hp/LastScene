<template>
	<dropdown
		:movie="movie"
		:iconName="iconMenu"
		:hovered="hovered"
		:is-open="dropdownState"
		:menu-height="menuHeight"
		:initial-height="initialHeight"
	>
		<ul class="m-menu__options" :class="{ 'm-menu__options--is-open':  dropdownState}" ref="menu">
			<li class="m-menu__option" @click="toggleFavourite()">
				<icon-heart class="m-menu__opticon | m-menu__opticon--heart" :is-done="movie.favourite" :is-pending="bus.favourite"></icon-heart>
				{{ favouriteText }}
			</li>
			<li class="m-menu__option" @click="toggleWatched()">
				<icon-watch class="m-menu__opticon | m-menu__opticon--eye " :is-done="movie.watched" :is-pending="bus.watched"></icon-watch>
				{{ watchedText }}
			</li>
			<li class="m-menu__option" @click="toggleWatchList()">
				<icon-list class="m-menu__opticon | m-menu__opticon--list " :is-done="movie.watchList" :is-pending="bus.watchList"></icon-list>
				{{ watchListText }}
			</li>
			<li class="m-menu__option">
				Add/Remove from collections
			</li>
			<li class="m-menu__option" @click="removeMovie()">
				Remove
			</li>
		</ul>
	</dropdown>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import Dropdown from './Dropdown.vue';
import IconMenu from './icons/Menu.vue';
import IconHeart from './icons/Heart.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';

export default {
	name: 'MicroMovieMenu',
	props: [
		'movie',
		'hovered',
		'bus'
	],
	data() {
		return {
			iconMenu: IconMenu,
			menuHeight: '',
			initialHeight: '',
			dropdownState: false
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
	mounted() {
		this.menuHeight = this.$refs.menu.clientHeight;
		this.initialHeight = 30;
	},
	components: {
		Dropdown,
		IconMenu,
		IconHeart,
		IconWatch,
		IconList
	},
	directives: {
		onClickaway
	},
	methods: {
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
	},
	watch: {

	}
};
</script>
