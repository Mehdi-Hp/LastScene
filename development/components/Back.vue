<template>
	<button
		v-esc="goBack"
		class="m-back | a-button | a-button--plain"
		@click="goBack"
	>
		<icon-arrow-left class="m-back__icon"></icon-arrow-left>
		<span class="m-back__button">{{ text || 'Back' }}</span>
	</button>
</template>

<script>
import IconArrowLeft from './icons/ArrowLeft.vue';

export default {
	name: 'Back',
	components: {
		IconArrowLeft
	},
	props: ['link', 'text'],
	data() {
		return {};
	},
	methods: {
		goBack() {
			this.$router.push(this.link || this.$router.lastRoute);
		}
	}
};
</script>
