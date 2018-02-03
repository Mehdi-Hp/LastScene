<template>
	<div class="o-buffet-tools">
		<div class="o-buffet-tools__item-holder | o-buffet-tools__item-holder--add">
			<button class="o-buffet-tools__item | o-buffet-tools__item--add">
				Add Movie
			</button>
		</div>
		<div class="o-buffet-tools__item-holder | o-buffet-tools__item-holder--sort">
			<sort-tool class="o-buffet-tools__item | o-buffet-tools__item--sort"></sort-tool>
		</div>
	</div>
</template>

<script>
import SortTool from './SortTool.vue';

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
		SortTool
	},
	methods: {

	},
	mounted() {

	}
};
</script>
