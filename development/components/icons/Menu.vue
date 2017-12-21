<template>
	<svg class="a-icon-menu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 63.6 63.6">
		<!-- <path class="a-icon-menu__holder" :class="{ 'a-icon-menu__holder--is-open': isOpen, 'a-icon-menu__holder--is-visible': hovered }" fill="currentColor" d="M 31.8,0 C 14.2,0 0,14.3 0,31.8 0,49.4 14.3,63.6 31.8,63.6 49.4,63.6 63.6,49.3 63.6,31.8 63.6,14.2 49.4,0 31.8,0 Z"/> -->
		<g class="a-icon-menu__holes" :class="{ 'a-icon-menu__holes--is-open': isOpen, 'a-icon-menu__holes--is-visible': hovered }">
			<rect class="a-icon-menu__hole" :class="{ 'a-icon-menu__hole--is-open': isOpen, 'a-icon-menu__hole--is-visible': hovered }" ry="5.6691384" y="26.107458" x="9.7661638" height="11.338277" width="11.338277" fill="currentColor"/>
			<rect class="a-icon-menu__hole" :class="{ 'a-icon-menu__hole--is-open': isOpen, 'a-icon-menu__hole--is-visible': hovered }" ry="5.6691384" y="26.108334" x="26.152517" height="11.338277" width="11.338277" fill="currentColor"/>
			<rect class="a-icon-menu__hole" :class="{ 'a-icon-menu__hole--is-open': isOpen, 'a-icon-menu__hole--is-visible': hovered }" ry="5.6691384" y="26.108334" x="42.53363" height="11.338277" width="11.338277" fill="currentColor"/>
		</g>
	</svg>
</template>

<script>
export default {
	name: 'icon',
	props: [
		'isOpen',
		'hovered'
	],
	computed: {}
};
</script>
