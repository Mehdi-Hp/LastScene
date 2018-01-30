<template>
	<div class="o-buffet-tools">
		<div class="o-buffet-tools__item-holder | o-buffet-tools__item-holder--add">
			<button class="o-buffet-tools__item | o-buffet-tools__item--add">
				Add Movie
			</button>
		</div>
		<div class="o-buffet-tools__item-holder | o-buffet-tools__item-holder--sort">
			<button class="o-buffet-tools__item | o-buffet-tools__item--sort">
				<icon-sort class="o-buffet-tools__icon"></icon-sort>
				Sort
			</button>
			
		</div>
	</div>
</template>

<script>
import IconSort from './icons/Sort.vue';

export default {
	data() {
		return {

		};
	},
	components: {
		IconSort
	}
};
</script>
