/* eslint-disable no-underscore-dangle */
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const debug = require('debug')('development');
const chalk = require('chalk');

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

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, email, password, done) => {
		debug('Passport logging user in...');
		debug(req.body);
		process.nextTick(() => {
			User.findOne({
				$or: [
					{
						'authentication.local.email': email
					},
					{
						username: email
					}
				]
			}, (error, user) => {
				if (error) {
					debug(`Error in passport login: ${error}`);
					return done(error);
				}
				if (!user) {
					debug('Email not found');
					return done('Email not found', null);
				}
				if (!user.isValidPassword(password, user)) {
					debug('Password is wrong');
					return done('Password is wrong', null);
				}
				debug(`User logged in: ${user}`);
				return done(null, user);
			});
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, email, password, done) => {
		process.nextTick(() => {
			User.findOne({
				'authentication.local.email': email
			}, (userFindError, user) => {
				if (userFindError) return done(userFindError, null);
				if (user) {
					debug('Email already exist!');
					return done('Email already exist!', null);
				}
				const newUser = new User({
					name: req.body.name,
					username: req.body.username,
					authentication: {
						local: {
							email
						}
					}
				});
				newUser.authentication.local.password = newUser.generateHash(password);
				debug(`Adding newUser: ${newUser}`);
				newUser.save((newUserError) => {
					debug('Saving new user...');
					if (newUserError) return done(newUserError, null);
					return done(null, newUser, `Added newUser: ${newUser}`);
				});
			});
		});
	}));

	debug(chalk.bold.cyan('Passport configured...'));
};
