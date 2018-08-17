<template>
	<svg
		viewBox="0 0 24 24"
		class="a-icon-clock"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			class="a-icon-clock__path"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10S2,17.5,2,12S6.5,2,12,2z M12,6v6l4,2"/>
	</svg>
</template>

<script>
export default {
	name: 'IconClock',
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
