<template>
	<svg viewBox="0 0 82.764374 49.769999" class="a-icon-watch" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g transform="translate(-2.7418151,-19.22)">
			<path class="a-icon-watch__path | a-icon-watch__around" :class="{
				'a-icon-watch__path--is-pending': isPending,
				'a-icon-watch__path--is-done': isDone,
				'a-icon-watch__around--is-pending': isPending,
				'a-icon-watch__around--is-done': isDone
			}" fill="currentColor" d="m 49.687036,27.522968 c 17.9,0 33.65,16.84 38.64,22.78 -4.99,5.95 -20.74,22.79 -38.64,22.79 -17.900004,0 -33.650004,-16.84 -38.640004,-22.78 4.99,-5.94 20.74,-22.78 38.640004,-22.78 z" />
			<path class="a-icon-watch__path | a-icon-watch__eyeball" :class="{
				'a-icon-watch__path--is-pending': isPending,
				'a-icon-watch__path--is-done': isDone,
				'a-icon-watch__eyeball--is-pending': isPending,
				'a-icon-watch__eyeball--is-done': isDone
			}" fill="currentColor" d="m 48.631103,63.351678 c 12.00937,-10e-7 18.021507,-14.518785 9.53063,-23.009663 -8.490878,-8.490877 -23.009662,-2.47874 -23.009663,9.53063 0.0077,7.441068 6.037965,13.471322 13.479033,13.479033 z" />
		</g>
	</svg>
</template>

<script>
export default {
	name: 'icon',
	props: [
		'isPending',
		'isDone'
	]
};
</script>
