<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 93.25 51.71"
		class="icon-eye"
		fill="currentColor"
		:class="{
			'icon-eye--is-animation': isAnimating,
			'icon-eye--is-fulfilled': isFulfilled,
		}"
	>
		<path
			class="icon-eye__path"
			fill="currentColor"
			d="M46.625 0C24.321 0 5.559 10.961 0 25.855 5.559 40.749 24.321 51.71 46.625 51.71S87.692 40.749 93.25 25.855C87.692 10.961 68.929 0 46.625 0zm0 43.362c-9.668 0-17.508-7.838-17.508-17.507s7.84-17.507 17.508-17.507c9.67 0 17.508 7.838 17.508 17.507s-7.838 17.507-17.508 17.507zm0-24.257c-3.728 0-6.75 3.022-6.75 6.75s3.022 6.75 6.75 6.75 6.75-3.022 6.75-6.75-3.022-6.75-6.75-6.75z"
		/>
	</svg>
</template>

<script>
export default {
	name: 'IconEye',
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
