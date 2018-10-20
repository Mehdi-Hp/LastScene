<template>
	<svg class="a-icon-heart" :class="{
		'a-icon-heart--is-done': isDone,
		}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3 0 65.852333 56.527405">
		<path class="a-icon-heart__path"
			:class="{
				'a-icon-heart__path--is-pending': isPending,
				'a-icon-heart__path--is-done': isDone,
				'a-icon-heart__path--washy': mode === 'washy'
			}"
			fill="currentColor"
			d="m 31.9073 54.074 c -19.2 -15.2 -21.5 -17.9 -24 -20.9 c -9.2 -11 -6.7 -23.4 0.6 -28.6 c 6.5 -4.6 15.7 -2.9 23.4 5.9 c 7.7 -8.7 16.9 -10.5 23.4 -5.9 v 0 v 0 c 7.3 5.2 9.9 17.6 0.6 28.6 c -2.5 3 -4.9 5.7 -24 20.9 Z"/>
	</svg>
</template>

<script>
export default {
	name: 'iconHeart',
	props: [
		'isPending',
		'isDone',
		'mode'
	]
};
</script>
