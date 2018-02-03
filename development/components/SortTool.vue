<template>
	<div class="m-sort-tool">
		<button class="m-sort-tool__clear" :class="{
				'm-sort-tool__clear--is-enabled': sortBy
			}" @click="clear"
		>
			<icon-x></icon-x>
		</button>
		<div class="m-sort-tool__inner" :class="{
				'm-sort-tool__inner--is-enabled--asc': sortOrder === 'asc',
				'm-sort-tool__inner--is-enabled--desc': sortOrder === 'desc'
			}">
			<button class="m-sort-tool__button"
				:class="{
					'm-sort-tool__button--is-enabled': sortBy
				}"
				@mouseover="hoverState = true"
				@mouseout="hoverState = false"
				@click="toggleDropdown"
			>
				<icon-sort class="m-sort-tool__icon"></icon-sort>
				Sort
			</button>
			<dropdown
				class="m-sort-tool__dropdown"
				parent-class="m-sort-tool"
				:hover-state="hoverState"
				:is-open="dropdownState"
				:menu-height="menuHeight"
				:menu-width="menuWidth"
				:initial-height="initialHeight"
				:initial-width="menuWidth"
				@toggleExpand="toggleDropdown"
				:class="{
					'm-sort-tool__dropdown--is-open':  dropdownState
				}"
			>
				<ul class="m-sort-tool__dropdown-menu | m-dropdown__menu"
					:class="{
						'm-dropdown__menu--is-open':  dropdownState,
						'm-sort-tool__dropdown-menu--is-open':  dropdownState
					}"
					ref="menu"
				>
					<li class="m-dropdown__option" @click="sortMovies('title', 'asc')">
						Title
					</li>
					<li class="m-dropdown__option" @click="sortMovies('director', 'asc')">
						Director Name
					</li>
					<li class="m-dropdown__option" @click="sortMovies('year', 'desc')">
						Release Year
					</li>
					<li class="m-dropdown__option" @click="sortMovies('createdAt', 'desc')">
						Add Date
					</li>
					<li class="m-dropdown__option" @click="sortMovies('rate', 'desc')">
						Your Rate
					</li>
					<li class="m-dropdown__option" @click="sortMovies('imdbRate', 'desc')">
						IMDB Rate
					</li>
					<!-- <li class="m-dropdown__option"  @click="sortMovies('mostAwards', 'desc')">
						Most Awards
					</li> -->
				</ul>
			</dropdown>
		</div>
		<div class="m-sort-tool__extra" :class="{
				'm-sort-tool__extra--is-visible': sortBy
			}">
			<span class="m-sort-tool__sorted-by">{{ sortBy }}</span>
			<button class="m-sort-tool__order"
				@click="(sortOrder === 'asc') ? sortMovies(sortBy, 'desc') : sortMovies(sortBy, 'asc')"
			>
				{{ sortOrderName }}
			</button>
		</div>
	</div>
</template>

<script>
import Dropdown from './Dropdown.vue';
import IconSort from './icons/Sort.vue';
import IconX from './icons/X--circle.vue';

export default {
	name: 'SortButton',
	data() {
		return {
			hoverState: false,
			menuHeight: 80,
			menuWidth: 160,
			initialHeight: null,
			initialWidth: null,
			dropdownState: false,
			sortBy: false,
			sortOrder: false,
			initialMovies: {}
		};
	},
	computed: {
		sortOrderName() {
			if (this.sortOrder === 'asc') {
				return 'Ascending';
			} else if (this.sortOrder === 'desc') {
				return 'Descending';
			}
		}
	},
	components: {
		IconSort,
		IconX,
		Dropdown
	},
	methods: {
		toggleDropdown(newDropdownState) {
			this.dropdownState = newDropdownState;
		},
		sortMovies(sortBy, order) {
			this.initialMovies = Object.assign(this.$store.state.user.movies);
			this.sortBy = sortBy;
			this.sortOrder = order;
			this.$store.commit('sortMovies', {
				sortBy: this.sortBy,
				order: this.sortOrder
			});
			this.toggleDropdown(false);
		},
		clear() {
			this.sortMovies('createdAt', 'desc');
			this.sortBy = null;
			this.sortOrder = false;
		}
	},
	mounted() {
		this.menuHeight = this.$refs.menu.clientHeight;
		this.menuWidth = this.$refs.menu.clientWidth;
		this.initialHeight = this.menuHeight / 2;
	}
};
</script>
