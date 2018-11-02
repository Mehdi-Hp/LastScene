<template>
	<div class="searchbar">
		<div class="searchbar__inner">
			<icon
				:class="{
					'searchbar__icon--is-active': value
				}"
				name="search"
				class="searchbar__icon"
			/>
			<input
				v-model="value"
				class="searchbar__textfield"
				placeholder="Search for movie, director, award, etc."
			>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SearchBar',
	components: {},
	data() {
		return {
			value: null
		};
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.searchbar {
	box: horizontal middle;
	height: $searchbar__height;
	background-color: $searchbar__background-color;
	position: fixed 0 0 auto 0;
	padding-left: $sidebar__width;
	z-index: g-index('mountain');

	&__inner {
		padding-left: $gutter;
		border-left: 1px solid tint($searchbar__text-color, 20%);
		width: calc(100% - #{$sidebar__width});
		height: calc(100% - #{$gutter--thin});
		box: horizontal middle;
	}

	&__icon {
		margin-right: 0.5em;
		size: 1.3em;
		color: $searchbar__text-color;
		transition: color 0.15s;

		&--is-active {
			color: $clay;
		}
	}

	&__textfield {
		height: 100%;
		flex-grow: 1;
		background-color: transparent;
		color: $clay;
		@include fix-text-rendering;

		&::placeholder {
			color: $searchbar__text-color;
			font-size: $fs-small;
		}
	}
}
</style>
