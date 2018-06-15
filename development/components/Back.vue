<template>
	<button
		v-esc="goBack"
		class="m-back | a-button | a-button--plain"
		@click="goBack"
	>
		<icon-arrow-left class="m-back__icon"></icon-arrow-left>
		<span class="m-back__button">Back</span>
	</button>
</template>

<script>
import IconArrowLeft from './icons/ArrowLeft.vue';

export default {
	name: 'Back',
	components: {
		IconArrowLeft
	},
	data() {
		return {};
	},
	methods: {
		goBack() {
			this.$router.push(this.$router.lastRoute);
		}
	}
};
</script>
