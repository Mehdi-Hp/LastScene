<template>
	<svg viewBox="0 0 82.764374 49.769999" class="a-icon-watch" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<path class="a-icon-watch__path | a-icon-watch__around" :class="{
				'a-icon-watch__path--is-pending': isPending,
				'a-icon-watch__path--is-done': isDone,
				'a-icon-watch__around--is-pending': isPending,
				'a-icon-watch__around--is-done': isDone,
			}" fill="currentColor" d="m 41.382666,2.0999999 c 17.9,0 33.65,16.8400001 38.64,22.7800001 -4.99,5.95 -20.74,22.79 -38.64,22.79 C 23.482662,47.67 7.7326619,30.83 2.7426619,24.89 7.7326619,18.95 23.482662,2.1099999 41.382666,2.1099999 Z" />
			<path class="a-icon-watch__path | a-icon-watch__eyeball" :class="{
				'a-icon-watch__path--is-pending': isPending,
				'a-icon-watch__path--is-done': isDone,
				'a-icon-watch__eyeball--is-pending': isPending,
				'a-icon-watch__eyeball--is-done': isDone,
			}" fill="currentColor" d="m 40.326733,37.92871 c 12.00937,-1e-6 18.021507,-14.518785 9.53063,-23.009663 -8.490878,-8.4908771 -23.009662,-2.47874 -23.009663,9.53063 0.0077,7.441068 6.037965,13.471322 13.479033,13.479033 z" />
	</svg>
</template>

<script>
export default {
	name: 'iconEye',
	props: [
		'isPending',
		'isDone'
	]
};
</script>
