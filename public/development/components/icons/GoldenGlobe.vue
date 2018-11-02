<template>
	<svg
		viewBox="0 0 51.348 79.973"
		class="goldenGlobeIcon"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			:class="{
				'goldenGlobeIcon__path--isAnimating': isAnimating,
				'goldenGlobeIcon__path--isFulfilledone': isFulfilled,
			}"
			class="goldenGlobeIcon__path"
			fill="currentColor"
			d="M 39.281,3.723 C 35.559,1.412 31.195,0 26.446,0 12.967,0 1.928,11.039 1.928,24.518 c 0,1.284 0.127,2.567 0.257,3.723 C 15.02,22.465 27.472,14.249 39.281,3.723 Z M 5.136,40.308 7.189,39.794 c 3.596,4.878 9.115,8.343 15.404,9.5 -0.513,3.852 -1.668,6.034 -3.594,9.5 H 34.66 C 32.734,55.07 31.578,52.89 31.065,49.167 42.62,47.111 51.348,37.099 51.348,25.032 c 0,-4.493 -1.283,-8.858 -3.466,-12.452 L 49.294,11.039 44.286,3.465 C 33.761,13.991 11.554,29.396 0,32.605 Z m 29.01,39.665 c 0,-3.596 -0.643,-6.805 -1.668,-9.241 3.98,0 13.863,-5.136 13.863,-8.985 H 8.473 c 0,3.852 8.985,9.112 12.709,9.112 -1.027,2.438 -1.541,5.521 -1.541,9.114 z"/>
	</svg>
</template>

<script>
export default {
	name: 'IconGoldenGlobe',
	props: {
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
