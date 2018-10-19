<template>
	<svg
		viewBox="0 0 24 24"
		class="a-icon-archive"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			class="a-icon-archive__path"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M21,8v13H3V8 M1,3h22v5H1V3z M10,12h4"/>
	</svg>
</template>

<script>
export default {
	name: 'IconArchive',
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
