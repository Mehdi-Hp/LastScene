<template>
	<svg
		viewBox="0 0 20.007 20"
		class="SampleIcon"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			:class="{
				'SampleIcon__path--isAnimating': isAnimating,
				'SampleIcon__path-isFulfilled': isFulfilled,
			}"
			class="SampleIcon__path"
			fill="currentColor"
			d=""/>
	</svg>
</template>

<script>
export default {
	name: 'IconSample',
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
