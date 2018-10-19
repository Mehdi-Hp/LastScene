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
	height: $searchbar-height;
	background-color: $searchbar-background-color;
	position: fixed 0 0 auto 0;
	padding-left: $sidebar-width;
	z-index: g-index('mountain');

	&__inner {
		padding-left: $gutter;
		border-left: 1px solid tint($searchbar-text-color, 20%);
		width: calc(100% - #{$sidebar-width});
		height: calc(100% - #{$gutter--thin});
		box: horizontal middle;
	}

	&__icon {
		margin-right: 0.5em;
		size: 1.3em;
		color: $searchbar-text-color;
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

		&::placeholder {
			color: $searchbar-text-color;
			font-size: $fs-small;
		}
	}
}
</style>
