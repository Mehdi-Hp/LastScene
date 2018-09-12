const debug = require('debug')('app:authController');
const chalk = require('chalk');
const owasp = require('owasp-password-strength-test');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { secret } = require('../config/appConf');

owasp.config({
	allowPassphrases: false,
	maxLength: 128,
	minLength: 8,
	minPhraseLength: 20,
	minOptionalTestsToPass: 0
});

module.exports = {
	async login(request, h) {
		const { email, password } = request.payload;
		const user = await User.findOne({
			'authentication.local.email': email
		});
		if (!user) {
			return h.notFound(`Invalid email: [${email}]`);
		}
		const isSamePassword = bcrypt.compareSync(password, user.authentication.local.password);
		if (isSamePassword) {
			return {
				username: user.username,
				email: user.authentication.local.email,
				name: user.name,
				token: jwt.sign(
					{
						data: {
							username: user.username,
							email: user.authentication.local.email,
							name: user.name
						}
					},
					secret,
					{}
				)
			};
		}
		return h.unauthorized('Invalid password');
	},
	async signup(request, h) {
		const { name, username, password, email } = request.payload;
		const passwordStrength = owasp.test(password);
		if (!passwordStrength.strong) {
			return h.badRequest('Password is weak.', passwordStrength.errors);
		}
		const emailAlreadyInDatabase = await User.findOne({
			'authentication.local.email': email
		});
		const usernameAlreadyInDatabase = await User.findOne({ username });
		if (usernameAlreadyInDatabase) {
			return h.badData(`User [${username}] already exists`);
		}
		if (emailAlreadyInDatabase) {
			return h.badData(`Email [${email}] already exists`);
		}
		await User.create({
			name,
			username,
			authentication: {
				local: {
					email,
					password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
				}
			}
		});
		return {
			name,
			username,
			email,
			token: jwt.sign({ data: { name, username, email } }, secret, {})
		};
	}
};
