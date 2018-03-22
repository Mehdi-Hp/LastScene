<template>
	<div class="o-auth-form">
		<div class="o-auth-form__switch">
			<router-link
				:to="(isLoginMode) ? 'signup' : 'login'"
				class="o-auth-form__switch-button"
			>
				{{ (isLoginMode) ? 'signup' : 'login' }}
			</router-link>
		</div>
		<div class="o-auth-form__inner">
			<h2 class="o-auth-form__title">
				{{ mode }}
			</h2>
			<form class="o-auth-form__itself">
				<div class="o-auth-form__fields">
					<textfield
						text="EMAIL"
						type="text"
						name="email"
						class="o-auth-form__textfield"
						@inputChange="value => fields.email = value"
					/>
					<textfield
						text="USERNAME"
						type="text"
						name="username"
						class="o-auth-form__textfield"
						@inputChange="value => fields.username = value"
						v-if="isSignupMode"
					/>
					<textfield
						text="PASSWORD"
						type="password"
						name="password"
						class="o-auth-form__textfield"
						@inputChange="value => fields.password = value"
					/>
				</div>
				<div class="o-auth-form__handlers">
					<button class="o-auth-form__forgot | a-button | a-button--plain" v-if="isLoginMode">
						Forgot the password
					</button>
					<div class="o-auth-form__auth"
						:class="{
							'o-auth-form__auth--is-loading': isSending
						}"
					>
						<button
							class="o-auth-form__auth-button | a-button"
							:class="{
								'o-auth-form__auth-button--is-loading': isSending
							}"
							:disabled="isSending"
							@click.prevent="submitForm"
						>
							{{ (isLoginMode) ? 'Login' : 'Signup' }}
						</button>
						<loader-1
							class="o-auth-form__auth-loader"
							:class="{
								'o-auth-form__auth-loader--is-loading': isSending
							}"
						></loader-1>
					</div>
				</div>
			</form>
			<div class="o-auth-form__extra">
				<button class="o-auth-form__google">
					<span class="o-auth-form__google-text">Authenticate with</span>
					<icon-google class="o-auth-form__google-image"/>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Textfield from './Textfield.vue';
import IconGoogle from './icons/GoogleFull.vue';
import Loader1 from './icons/Loader1.vue';

export default {
	name: 'AuthForm',
	components: {
		IconGoogle,
		Textfield,
		Loader1
	},
	props: ['mode'],
	data() {
		return {
			fields: {
				name: '',
				email: '',
				password: '',
				username: ''
			},
			isSending: false,
			hasError: ''
		};
	},
	computed: {
		isLoginMode() {
			return this.mode === 'login';
		},
		isSignupMode() {
			return this.mode === 'signup';
		}
	},
	methods: {
		submitForm() {
			if (this.isLoginMode) {
				if (!this.isSending) {
					this.isSending = true;
					this.$axios.defaults.baseURL = '';
					this.$axios.post('/authenticate/login', this.fields)
						.then((user) => {
							if (user.data.auth) {
								this.$ls.set('x-access-token', user.data.token);
								this.axios.defaults.headers = {
									'x-access-token': this.$ls.get('x-access-token')
								};
								this.axios.defaults.baseURL = '/api/v1';
								this.$router.push(user.data.redirectURL);
							}
							this.isSending = false;
						})
						.catch((error) => {
							console.log(error.response.data);
							this.isSending = false;
							this.hasError = error.response.data.message;
						});
				}
			} else if (this.isSignupMode) {
				this.isSending = true;
				this.$axios.defaults.baseURL = '';
				this.$axios.post('/authenticate/signup', this.fields)
					.then((user) => {
						if (user.data.auth) {
							this.$ls.set('x-access-token', user.data.token);
							this.axios.defaults.headers = {
								'x-access-token': this.$ls.get('x-access-token')
							};
							this.axios.defaults.baseURL = '/api/v1';
							this.$router.push(user.data.redirectURL);
						}
						this.isSending = false;
					})
					.catch((error) => {
						console.log(error.response.data);
						this.isSending = false;
						this.hasError = error.response.data.message;
					});
			}
		}
	}
};
</script>
