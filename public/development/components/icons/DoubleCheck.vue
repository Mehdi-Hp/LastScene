<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 19.053907 12.007225"
		class="doubleCheckIcon"
		fill="currentColor"
		:class="{
			'doubleCheckIcon--isAnimating': isAnimating,
			'doubleCheckIcon--isFulfilled': isFulfilled,
		}"
	>
		<path
			class="doubleCheckIcon__path"
			fill="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M 12.997225,3.9564236e-4 A 1,1 0 0 0 12.239413,0.38711444 L 5.239412,9.387114 1.8077714,5.205474 a 1,1 0 1 0 -1.5585938,1.25 l 4.1699219,5.18164 a 1,1 0 0 0 0.7792969,0.369141 1,1 0 0 0 0.8300781,-0.380859 L 13.858553,1.6253956 A 1,1 0 0 0 13.647616,0.21719254 1,1 0 0 0 12.997225,3.9564236e-4 Z m 5,0 A 1,1 0 0 0 17.239413,0.38711444 l -7,8.99999956 -0.6113295,-0.75 -1.259765,1.619141 1.099609,1.369141 a 1,1 0 0 0 0.7812505,0.371093 1,1 0 0 0 0.779297,-0.380859 l 7.830078,-10 A 1,1 0 0 0 18.647616,0.21719254 1,1 0 0 0 17.997225,3.9564236e-4 Z M 5.9640214,4.793364 A 1,1 0 0 0 5.3976151,5.006255 1,1 0 0 0 5.2491776,6.416411 L 5.739412,7.066802 7.0284745,5.445708 6.8292557,5.205474 A 1,1 0 0 0 5.9640214,4.793364 Z"
		/>
	</svg>
</template>

<script>
export default {
	name: 'IconDoubleCheck',
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
