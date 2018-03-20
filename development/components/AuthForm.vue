<template>
	<div class="o-auth-form">
		<div class="o-auth-form__switch">
			<a href="#" class="o-auth-form__switch-button">Signup</a>
		</div>
		<div class="o-auth-form__inner">
			<h2 class="o-auth-form__title">
				LOGIN
			</h2>
			<form class="o-auth-form__itself">
				<div class="o-auth-form__fields">
					<textfield
						text="EMAIL"
						type="text"
						name="email"
						class="o-auth-form__textfield"
						:email="email"
						@inputChange="value => email = value"
					/>
					<textfield
						text="PASSWORD"
						type="password"
						name="password"
						class="o-auth-form__textfield"
						:password="password"
						@inputChange="value => password = value"
					/>
				</div>
				<div class="o-auth-form__handlers">
					<button class="o-auth-form__forgot | a-button | a-button--plain">Forgot the password</button>
					<div class="o-auth-form__login"
						:class="{
							'o-auth-form__login--is-loading': isSending
						}"
					>
						<button
							class="o-auth-form__login-button | a-button"
							:class="{
								'o-auth-form__login-button--is-loading': isSending
							}"
							:disabled="isSending"
							@click.prevent="submitForm">Login</button>
						<svg class="o-auth-form__login-loader" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"
							:class="{
								'o-auth-form__login-loader--is-loading': isSending
							}"
						>
							<path fill="#66826f" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
								<animateTransform attributeName="transform" attributeType="XML"
									type="rotate"
									dur="0.7s"
									from="0 50 50"
									to="360 50 50"
									repeatCount="indefinite"
								/>
							</path>
						</svg>
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
import IconGoogle from './icons/GoogleFull.vue';
import Textfield from './Textfield.vue';

export default {
	name: 'AuthForm',
	components: {
		IconGoogle,
		Textfield
	},
	data() {
		return {
			email: '',
			password: '',
			isSending: false,
			hasError: ''
		};
	},
	methods: {
		submitForm() {
			if (!this.isSending) {
				this.isSending = true;
				this.$axios.defaults.baseURL = '';
				this.$axios.post('/authenticate/login', {
					email: this.email,
					password: this.password
				})
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
