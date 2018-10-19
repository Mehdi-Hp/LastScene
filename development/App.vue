<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import './assets/notcss/base/base.scss';

export default {
	name: 'App',
	data() {
		return {};
	},
	created() {
		this.axios.defaults.headers = {
			'x-access-token': this.$ls.get('x-access-token')
		};
	}
};
</script>
