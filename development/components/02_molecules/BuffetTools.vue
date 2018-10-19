<template>
	<div class="buffet-tools">
		<app-button
			class="buffet-tools__add"
			mode="primary"
			text="Add Movie"
			icon="movie"
		/>
		<app-button
			class="buffet-tools__sort"
			mode="ghost"
			text="Sort"
			icon="sort"
		/>
	</div>
</template>

<script>
export default {
	name: 'BuffetTools',
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.buffet-tools {
	box: horizontal space-between;

	&__add {
	}

	&__sort {
		color: $green;
	}
}
</style>
