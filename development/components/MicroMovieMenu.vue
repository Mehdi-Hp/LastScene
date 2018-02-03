<template>
	<dropdown
		:parentClass="parentClass"
		:movie="movie"
		:iconName="iconMenu"
		:hover-state="hoverState"
		:is-open="dropdownState"
		:menu-height="menuHeight"
		:menu-width="menuWidth"
		:initial-height="initialHeight"
		:initial-width="initialWidth"
		@toggleExpand="toggleDropdown"
		class="o-micro-movie__dropdown"
		:class="{
			'o-micro-movie__dropdown--is-open':  dropdownState,
			'o-micro-movie__dropdown--is-visible':  hoverState
		}"
	>
		<ul class="o-micro-movie__dropdown-menu | m-dropdown__menu"
			:class="{
				'm-dropdown__menu--is-open':  dropdownState,
				'o-micro-movie__dropdown-menu--is-open':  dropdownState
			}"
			ref="menu"
		>
			<li class="m-dropdown__option" @click="toggleFavourite()">
				<icon-heart class="m-dropdown__opticon | m-dropdown__opticon--heart" :is-done="movie.favourite" :is-pending="bus.favourite"></icon-heart>
				{{ favouriteText }}
			</li>
			<li class="m-dropdown__option" @click="toggleWatched()">
				<icon-watch class="m-dropdown__opticon | m-dropdown__opticon--eye " :is-done="movie.watched" :is-pending="bus.watched"></icon-watch>
				{{ watchedText }}
			</li>
			<li class="m-dropdown__option" @click="toggleWatchList()">
				<icon-list class="m-dropdown__opticon | m-dropdown__opticon--list " :is-done="movie.watchList" :is-pending="bus.watchList"></icon-list>
				{{ watchListText }}
			</li>
			<li class="m-dropdown__option">
				Add/Remove from collections
			</li>
			<li class="m-dropdown__option" @click="removeMovie()">
				Remove
			</li>
		</ul>
	</dropdown>
</template>

<script>
import Dropdown from './Dropdown.vue';
import IconMenu from './icons/Menu.vue';
import IconHeart from './icons/Heart.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';

export default {
	name: 'MicroMovieMenu',
	props: [
		'movie',
		'hoverState',
		'bus',
		'parentClass'
	],
	data() {
		return {
			dropdownState: this.movie.openMenu,
			iconMenu: IconMenu,
			menuHeight: '',
			menuWidth: '',
			initialHeight: 27,
			initialWidth: 27
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
		this.menuWidth = this.$refs.menu.clientWidth;
	},
	components: {
		Dropdown,
		IconMenu,
		IconHeart,
		IconWatch,
		IconList
	},
	methods: {
		toggleDropdown() {
			this.dropdownState = !this.dropdownState;
			this.$emit('toggleMenu', !this.dropdownState);
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
