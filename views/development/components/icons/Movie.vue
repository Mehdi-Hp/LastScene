<template>
	<svg
		viewBox="0 0 24 24"
		class="a-icon-movie"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			class="a-icon-movie__path"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M5.4,2h13.3C20.5,2,22,3.5,22,5.4v13.3c0,1.9-1.5,3.4-3.4,3.4H5.4C3.5,22,2,20.5,2,18.6V5.4C2,3.5,3.5,2,5.4,2zM2,17h5v5V2v5H2v5h20V7h-5V2v20v-5h5"/>
	</svg>
</template>

<script>
export default {
	name: 'IconMovie',
	props: {
		isAnimating: {
			type: Boolean,
			required: false,
			default: false
		},
		isDone: {
			type: Boolean,
			required: false,
			default: false
		}
	}
};
</script>
