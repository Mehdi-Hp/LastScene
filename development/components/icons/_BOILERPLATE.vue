<template>
	<svg
		viewBox="0 0 20.007 20"
		class="a-icon-SAMPLE"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<path
			:class="{
				'a-icon-SAMPLE__path--is-pending': isPending,
				'a-icon-SAMPLE__path--is-done': isDone,
			}"
			class="a-icon-SAMPLE__path"
			fill="currentColor"
			d=""/>
	</svg>
</template>

<script>
export default {
	name: 'IconSAMPLE',
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
