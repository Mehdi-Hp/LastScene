<template>
	<div class="m-menu" :style="{ 'height': menuHeight }" :class="{ 'm-menu--is-open': isOpen, 'm-menu--is-visible': hovered }" v-on-clickaway="closeMenu">
		<icon-menu class="m-menu__icon" :class="{ 'm-menu__icon--is-visible': hovered, 'm-menu__icon--is-open': isOpen, 'a-icon-menu--is-open': isOpen, 'a-icon-menu--is-visible': hovered }" @click.native="toggleMenu()" :isOpen="isOpen" :hovered="hovered"></icon-menu>
		<ul class="m-menu__options" :class="{ 'm-menu__options--is-open':  isOpen}" ref="menuOptions">
			<li class="m-menu__option" @click="toggleFavourite()">
				<icon-heart class="m-menu__opticon" :is-done="movie.favourite" :is-pending="bus.favourite"></icon-heart>
				{{ favouriteText }}
			</li>
			<li class="m-menu__option" @click="toggleWatched()">
				<icon-watch class="m-menu__opticon | m-menu__opticon--eye " :is-done="movie.watched" :is-pending="bus.watched"></icon-watch>
				{{ watchedText }}
			</li>
			<li class="m-menu__option">
				<icon-list class="m-menu__opticon | m-menu__opticon--list " :is-done="movie.watched" :is-pending="bus.watched"></icon-list>
				Add to watch list
			</li>
			<li class="m-menu__option">
				Add/Remove from collections
			</li>
		</ul>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import IconMenu from './icons/Menu.vue';
import IconHeart from './icons/Heart.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';

export default {
	name: 'TheMenu',
	props: [
		'movie',
		'hovered',
		'bus'
	],
	data() {
		return {
			isOpen: false,
			menuHeight: '30px'
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
		}
	},
	components: {
		IconMenu,
		IconHeart,
		IconWatch,
		IconList
	},
	directives: {
		onClickaway
	},
	methods: {
		getMenuHeight() {
			if (this.isOpen === true) {
				return `${this.$refs.menuOptions.clientHeight}px`;
			}
			return '30px';
		},
		toggleMenu() {
			this.isOpen = !this.isOpen;
			this.menuHeight = this.getMenuHeight();
		},
		closeMenu() {
			this.isOpen = false;
			this.menuHeight = this.getMenuHeight();
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
		}
	}
};
</script>
