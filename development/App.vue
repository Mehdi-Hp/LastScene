<template>
	<div id="app">
		<sidebar></sidebar>
		<hutch></hutch>
	</div>
</template>

<script>
import sidebar from './components/sidebar.vue';
import hutch from './components/hutch.vue';

export default {
	name: 'app',
	data () {
		return {

		}
	},
	components: {
		sidebar
		hutch
	}
}
</script>
