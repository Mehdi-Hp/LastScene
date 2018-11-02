<template>
	<component
		class="icon"
		:is="`icon-${name}`"
		:is-fulfilled="isFulfilled"
		:is-animating="isAnimating"
	/>
</template>

<script>
import IconBox from '@icons/Archive.vue';
import IconClock from '@icons/Clock.vue';
import IconSearch from '@icons/Search.vue';
import IconMovie from '@icons/Movie.vue';
import IconSort from '@icons/Sort.vue';
import IconHeart from '@icons/Heart.vue';
import IconFlag from '@icons/Flag.vue';
import IconEye from '@icons/Eye.vue';

export default {
	name: 'Icon',
	components: {
		IconBox,
		IconSearch,
		IconClock,
		IconMovie,
		IconSort,
		IconHeart,
		IconFlag,
		IconEye
	},
	props: {
		name: {
			type: String,
			required: true
		},
		isAnimating: {
			type: Boolean,
			required: false,
			default: false
		},
		isFulfilled: {
			type: Boolean,
			required: false,
			default: false
		}
	}
};
</script>

<style lang="scss">
.icon {
	max-width: 100%;
	max-height: 100%;
	box: center middle;
}
</style>
