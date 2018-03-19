<template>
	<div class="p-authenticate">
		<div class="p-authenticate__box">
			<div class="p-authenticate__cover">
				<span class="p-authenticate__slug">
					GET <br/>
					YOUR <br/>
					MOVIES <br/>
					ORGANIZED, <br/>
					NOW
				</span>
			</div>
			<auth-form/>
		</div>
	</div>
</template>

<script>
import AuthForm from './AuthForm.vue';

export default {
	name: 'Authenticate',
	components: {
		AuthForm
	},
	data() {
		return {

		};
	}
};
</script>
