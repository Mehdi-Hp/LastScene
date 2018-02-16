<template>
	<button class="m-back | a-button | a-button--plain" @click="goBack" v-esc="goBack">
		<icon-arrow-left class="m-back__icon"></icon-arrow-left>
		<span class="m-back__button">Back</span>
	</button>
</template>

<script>
import IconArrowLeft from './icons/ArrowLeft.vue';

export default {
	name: 'Back',
	data() {
		return {

		};
	},
	components: {
		IconArrowLeft
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
