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
						@inputChange="value => email = value"
						@inputKeyup="$validate('email')"
						:error="validation.firstError('email')"
					/>
					<textfield
						text="USERNAME"
						type="text"
						name="username"
						class="o-auth-form__textfield"
						@inputChange="value => username = value"
						@inputKeyup="$validate('username')"
						v-if="isSignupMode"
						:error="validation.firstError('username')"
					/>
					<textfield
						text="PASSWORD"
						type="password"
						name="password"
						class="o-auth-form__textfield"
						@inputChange="value => password = value"
						@inputKeyup="$validate('password')"
						:error="validation.firstError('password')"
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
				<a
					href="http://localhost:3000/authenticate/google"
					class="o-auth-form__google"
				>
					<span class="o-auth-form__google-text">Authenticate with</span>
					<icon-google class="o-auth-form__google-image"/>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import SimpleVueValidation from 'simple-vue-validator';
import owasp from 'owasp-password-strength-test';
import Textfield from './Textfield.vue';
import IconGoogle from './icons/GoogleFull.vue';
import Loader1 from './icons/Loader1.vue';

SimpleVueValidation.setMode('manual');
const validator = SimpleVueValidation.Validator;

owasp.config({
	allowPassphrases: false,
	maxLength: 128,
	minLength: 8,
	minPhraseLength: 20,
	minOptionalTestsToPass: 0
});

export default {
	name: 'AuthForm',
	components: {
		IconGoogle,
		Textfield,
		Loader1
	},
	mixins: [SimpleVueValidation.mixin],
	props: ['mode'],
	data() {
		return {
			name: '',
			email: '',
			password: '',
			username: '',
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
			this.calcFieldsHeight();
		}
	},
	mounted() {
		this.$axios.defaults.baseURL = '/authenticate';
		this.calcFieldsHeight();
	},
	beforeDestroy() {
		this.axios.defaults.baseURL = '/api/v1';
	},
	methods: {
		submitForm() {
			this.$validate();
			if (!this.validation.errors.length) {
				if (!this.isSending) {
					this.isSending = true;
					this.$axios
						.post(`${this.isLoginMode ? 'login' : 'signup'}`, {
							email: this.email,
							username: this.username,
							password: this.password
						})
						.then((user) => {
							if (user.data.auth) {
								this.$ls.set('x-access-token', user.data.token, 7 * 24 * 60 * 60 * 1000);
								this.axios.defaults.headers = {
									'x-access-token': this.$ls.get('x-access-token')
								};
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
				let fieldMargin = getComputedStyle(this.$refs.fields.children[0], null).getPropertyValue('margin-bottom');
				fieldMargin = +fieldMargin.slice(0, fieldMargin.indexOf('px'));
				const ultimateHeight = fieldsHeight + fieldMargin;
				const fieldsCount = this.$refs.fields.children.length;
				this.fieldsHeight = {
					height: `calc(${ultimateHeight}px * ${fieldsCount})`
				};
			});
		}
	},
	validators: {
		email: {
			cache: true,
			debounce: 200,
			validator(value) {
				return validator
					.value(value)
					.required()
					.email()
					.custom(() => {
						if (this.isSignupMode) {
							return this.$axios
								.get(`/check?email=${this.email.trim()}`)
								.then((response) => {
									console.log(response.data);
									if (response.data.exist) {
										console.log('Email already exist');
										return 'Email already exist';
									}
								})
								.catch((error) => {
									console.error(error.response.data);
								});
						}
					});
			}
		},
		username: {
			cache: true,
			debounce: 500,
			validator(value) {
				if (this.isSignupMode) {
					return validator
						.value(value)
						.required()
						.custom(() => {
							const regex = /^\w+$/;
							if (!regex.test(this.username)) {
								return 'Only accepts alphanumeric and _underscore';
							}
						})
						.custom(() => {
							return this.$axios
								.get(`/check?username=${this.username.trim()}`)
								.then((response) => {
									if (response.data.exist) {
										console.log('Username already exist');
										return 'Username already exist';
									}
								})
								.catch((error) => {
									console.error(error.response.data);
								});
						});
				}
				return validator.value(value);
			}
		},
		password(value) {
			if (this.isSignupMode) {
				return validator
					.value(value)
					.required()
					.minLength(8)
					.maxLength(100)
					.custom(() => {
						const passwordStrength = owasp.test(this.password);
						if (!passwordStrength.strong) {
							return passwordStrength.requiredTestErrors[0];
						}
					});
			}
			return validator.value(value).required();
		}
	}
};
</script>
