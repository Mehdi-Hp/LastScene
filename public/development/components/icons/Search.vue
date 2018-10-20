<template>
	<svg
		viewBox="0 0 24 24"
		class="a-icon-search"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			class="a-icon-search__path"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m 21,21 c -1.266667,-1.266667 -2.533333,-2.533333 -3.8,-3.8 1.266667,1.266667 2.533333,2.533333 3.8,3.8 z M 19,11 C 19.196984,16.187947 13.529103,20.357721 8.6358383,18.642692 3.6247047,17.296754 1.30723,10.652304 4.3973151,6.4828602 7.1641072,2.0915578 14.196126,1.8425332 17.266615,6.0271203 18.383327,7.4271125 19.004361,9.2094383 19,11 Z"/>
	</svg>
</template>

<script>
export default {
	name: 'IconSearch',
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
