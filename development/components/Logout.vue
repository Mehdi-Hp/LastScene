<template>
	<div class="o-logout">
		<div class="o-logout__loader-holder">
			<loader-1 class="o-logout__loader"></loader-1>
		</div>
		<span class="o-logout__text">
			Logging you out
		</span>
	</div>
</template>

<script>
import AuthForm from './AuthForm.vue';
import Loader1 from './icons/Loader1.vue';

export default {
	name: 'Authenticate',
	components: {
		AuthForm,
		Loader1
	},
	data() {
		return {

		};
	},
	mounted() {
		setTimeout(() => {
			this.$axios.defaults.baseURL = '';
			this.$axios.post('/authenticate/logout')
				.then((response) => {
					console.log(response.data);
					this.$ls.remove('x-access-token', null);
					this.axios.defaults.headers = {
						'x-access-token': null
					};
					this.axios.defaults.baseURL = '/api/v1';
				})
				.catch((error) => {
					console.log(error.response.data);
				});
		}, 1000);
	}
};
</script>
