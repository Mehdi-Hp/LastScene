<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 24 24"
		class="a-icon-heart"
		fill="currentColor"
	>
		<path
			fill="currentColor"
			class="icon-heart__path"
			:class="{
				'icon-heart__path--is-animation': isAnimationg,
				'icon-heart__path--is-done': isFulfilled,
			}"
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/>
	</svg>
</template>

<script>
export default {
	name: 'IconHeart',
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
