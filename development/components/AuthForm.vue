<template>
	<div class="o-auth-form">
		<div class="o-auth-form__switch">
			<router-link
				to="login"
				class="o-auth-form__switch-button"
				:class="{
					'o-auth-form__switch-button--is-visible': isSignupMode
				}"
			>
				login
			</router-link>
			<router-link
				to="signup"
				class="o-auth-form__switch-button"
				:class="{
					'o-auth-form__switch-button--is-visible': isLoginMode
				}"
			>
				signup
			</router-link>
		</div>
		<div class="o-auth-form__inner">
			<div class="o-auth-form__title-holder">
				<h2
					class="o-auth-form__title"
					:class="{
						'o-auth-form__title--is-visible': isLoginMode
					}"
				>
					login
				</h2>
				<h2
					class="o-auth-form__title"
					:class="{
						'o-auth-form__title--is-visible': isSignupMode
					}"
				>
					signup
				</h2>
			</div>
			<form class="o-auth-form__itself">
				<div
					class="o-auth-form__fields"
					:style="fieldsHeight"
					ref="fields"
				>
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
				<div
					class="o-auth-form__handlers"
					ref="authHandlers"
				>
					<button
						class="o-auth-form__forgot | a-button | a-button--plain"
						:class="{
							'o-auth-form__forgot--is-visible': isLoginMode
						}"
					>
						Forgot the password
					</button>
					<div
						class="o-auth-form__auth"
						:class="{
							'o-auth-form__auth--is-loading': isSending
						}"
						:style="authButtonTransferX"
						ref="authButton"
					>
						<button
							class="o-auth-form__auth-button | a-button"
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
			hasError: '',
			authButtonTransferX: {},
			fieldsHeight: {}
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
	watch: {
		isLoginMode() {
			this.calcAuthButtonTransferX();
			this.calcFieldsHeight();
		}
	},
	mounted() {
		this.calcAuthButtonTransferX();
		this.calcFieldsHeight();
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
		},
		calcAuthButtonTransferX() {
			if (this.isLoginMode) {
				this.authButtonTransferX = {
					transform: `translateX(0)`
				};
			} else {
				const parentWidth = this.$refs.authHandlers.clientWidth;
				const buttonWidth = this.$refs.authButton.clientWidth;
				const delta = parentWidth - buttonWidth;
				this.authButtonTransferX = {
					transform: `translateX(-${delta}px)`
				};
			}
		},
		calcFieldsHeight() {
			this.$nextTick(() => {
				const fieldsHeight = this.$refs.fields.children[0].clientHeight;
				let fieldMargin = getComputedStyle(this.$refs.fields.children[0], null).getPropertyValue("margin-bottom");
				fieldMargin = +fieldMargin.slice(0, fieldMargin.indexOf('px'));
				const ultimateHeight = fieldsHeight + fieldMargin;
				const fieldsCount = this.$refs.fields.children.length;
				console.log(`calc(${ultimateHeight} * ${fieldsCount})px`);
				this.fieldsHeight = {
					height: `calc(${ultimateHeight}px * ${fieldsCount})`
				};
			});
		}
	}
};
</script>
