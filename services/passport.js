const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const debug = require('debug')('app:passport');
const chalk = require('chalk');
const owasp = require('owasp-password-strength-test');
const gravatar = require('gravatar');
const User = require('../models/user');

owasp.config({
	allowPassphrases: false,
	maxLength: 128,
	minLength: 8,
	minPhraseLength: 20,
	minOptionalTestsToPass: 0
});

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		debug('Called serializeUser');
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		debug('Called deserializeUser');
		User.findById(id, (error, user) => {
			done(error, user);
		});
	});

	passport.use(
		'local-login',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, email, password, done) => {
				debug(chalk.yellow('Passport logging user in...'));
				debug(req.body);
				process.nextTick(() => {
					User.findOne(
						{
							$or: [
								{
									'authentication.local.email': email
								},
								{
									username: email
								}
							]
						},
						(error, user) => {
							if (error) {
								debug(chalk.red(`Error in passport login: ${error}`));
								return done(error);
							}
							if (!user) {
								debug(chalk.red('Email not found'));
								return done('Email not found', null);
							}
							if (!user.isValidPassword(password, user)) {
								debug(chalk.red('Password is wrong'));
								return done('Password is wrong', null);
							}
							debug(chalk.red(`User logged in: ${user}`));
							return done(null, user);
						}
					);
				});
			}
		)
	);

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, email, password, done) => {
				process.nextTick(() => {
					const passwordStrength = owasp.test(req.body.password);
					if (!passwordStrength.strong) {
						return done(passwordStrength.requiredTestErrors, null);
					}
					User.findOne(
						{
							'authentication.local.email': email
						},
						(error, user) => {
							if (error) return done(error, null);
							if (user) {
								debug(chalk.red.bold('Email already exist!'));
								return done('Email already exist!', null);
							}
							User.findOne(
								{
									username: req.body.username
								},
								(error, user) => {
									if (error) return done(error, null);
									if (user) {
										debug(chalk.red.bold('Username already exist!'));
										return done('Username already exist!', null);
									}
								}
							);
							const gravatarURL = gravatar.url(req.body.email, {
								d: '404'
							});
							const newUser = new User({
								name: req.body.name,
								username: req.body.username,
								authentication: {
									local: {
										email
									}
								},
								avatar: gravatarURL
							});
							newUser.authentication.local.password = newUser.generateHash(password);
							debug(chalk.green(`Adding new user: ${newUser}`));
							newUser.save((error) => {
								debug(chalk.green('New user created'));
								if (error) return done(error, null);
								return done(null, newUser, `Added newUser: ${newUser}`);
							});
						}
					);
				});
			}
		)
	);

	passport.use(
		'google',
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
				clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
				callbackURL: `${process.env.BACKEND_HOST}/authenticate/google/callback`
			},
			(accessToken, refreshToken, profile, done) => {
				process.nextTick(() => {
					debug(chalk.yellow('Authenticating user with google oauth...'));
					User.findOneAndUpdate(
						{
							'authentication.local.email': profile.emails[0].value
						},
						{
							'authentication.google': {
								id: profile.id,
								accessToken,
								refreshToken,
								email: profile.emails[0].value
							},
							avatar: profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'))
						},
						{ new: true },
						(error, user) => {
							if (error) return done(error, null);
							if (user) {
								debug(chalk.green(`Local user already exists. Updated google oauth [${user.name}]`));
								return done(null, user);
							}
							User.findOne(
								{
									'authentication.google.id': profile.id
								},
								(error, user) => {
									if (error) return done(error, null);
									if (user) {
										debug(chalk.green.bold('Google user already exist!'));
										return done(null, user);
									}
									const newUser = new User({
										name: profile.displayName,
										authentication: {
											local: {
												email: profile.emails[0].value
											},
											google: {
												id: profile.id,
												accessToken,
												refreshToken,
												email: profile.emails[0].value
											}
										},
										avatar: profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'))
									});
									debug(chalk.green(`Adding new google user: ${newUser}`));
									newUser.save((error) => {
										debug(chalk.green('New google user created'));
										if (error) return done(error, null);
										return done(null, newUser, `Added new user: ${newUser.name}`);
									});
								}
							);
						}
					);
				});
			}
		)
	);

	debug(chalk.bold.cyan('Passport configured...'));
};
