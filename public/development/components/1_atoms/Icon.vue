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
import IconDoubleCheck from '@icons/DoubleCheck.vue';
import IconOscar from '@icons/Oscar.vue';
import IconBafta from '@icons/Bafta.vue';
import IconGoldenGlobe from '@icons/GoldenGlobe.vue';
import IconPalme from '@icons/Palme.vue';
import IconBerlin from '@icons/Berlin.vue';

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
		IconEye,
		IconDoubleCheck,
		IconOscar,
		IconBafta,
		IconGoldenGlobe,
		IconPalme,
		IconBerlin
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
