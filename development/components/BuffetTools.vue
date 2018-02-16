<template>
	<div class="o-buffet-tools">
		<div class="o-buffet-tools__item-holder | o-buffet-tools__item-holder--add">
			<add-movie-tool class="o-buffet-tools__item | o-buffet-tools__item--add"></add-movie-tool>
		</div>
		<div class="o-buffet-tools__item-holder | o-buffet-tools__item-holder--sort">
			<sort-tool class="o-buffet-tools__item | o-buffet-tools__item--sort"></sort-tool>
		</div>
	</div>
</template>

<script>
import SortTool from './SortTool.vue';
import AddMovieTool from './AddMovieTool.vue';

export default {
	name: 'BuffetTools',
	props: [

	],
	data() {
		return {

		};
	},
	computed: {

	},
	components: {
		SortTool,
		AddMovieTool
	},
	methods: {

	},
	mounted() {

	}
};
</script>
