<template>
	<svg viewBox="0 0 95 95" class="a-icon-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<path class="a-icon-list__path | a-icon-list__around" :class="{
			'a-icon-list__path--is-pending': isPending,
			'a-icon-list__path--is-done': isDone,
			'a-icon-list__around--is-pending': isPending,
			'a-icon-list__around--is-done': isDone,
			'a-icon-list__around--custom-color': customColor
		}" fill="currentColor" d="M 50,5 C 25.2,5 5,25.2 5,50 c 0,24.9 20.1,45 45,45 12.6,0 45,0 45,0 0,0 0,-32.8 0,-45 C 95,25.2 74.9,5 50,5 Z" />
		<path class="a-icon-list__path | a-icon-list__dot" :class="{
			'a-icon-list__path--is-pending': isPending,
			'a-icon-list__path--is-done': isDone,
			'a-icon-list__dot--is-pending': isPending,
			'a-icon-list__dot--is-done': isDone,
			'a-icon-list__dot--custom-color': customColor
		}" fill="currentColor" d="m 50,32.5 c -9.7,0 -17.5,7.8 -17.5,17.5 0,9.7 7.9,17.5 17.5,17.5 4.9,0 17.5,0 17.5,0 0,0 0,-12.8 0,-17.5 0,-9.6 -7.8,-17.5 -17.5,-17.5 z" />
	</svg>
</template>

<script>
export default {
	name: 'icon',
	props: [
		'isPending',
		'isDone',
		'customColor'
	]
};
</script>
