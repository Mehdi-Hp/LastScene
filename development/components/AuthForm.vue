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
					<button class="o-auth-form__login | a-button">Login</button>
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
			password: ''
		};
	}
};
</script>
