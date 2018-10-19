<template>
	<div class="o-auth-form">

	</div>
</template>

<script>
export default {
	name: 'GoogleOauthCallback',
	data() {
		return {};
	},
	created() {
		this.$ls.set('x-access-token', this.$route.query.token);
		this.axios.defaults.headers = {
			'x-access-token': this.$route.query.token
		};
		this.$router.push('/');
	}
};
</script>
