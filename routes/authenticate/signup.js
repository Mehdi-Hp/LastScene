const app = require('express')();
const passport = require('passport');
const debug = require('debug')('development');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

app.route('/')
	.get((req, res, next) => {
		res.render('signup.ejs');
	})
	.post((req, res, next) => {
		debug(chalk.yellow.italic('Signing up user...'));
		debug(req.body);
		passport.authenticate('local-signup', {}, (error, user, message) => {
			if (error) {
				return res.status(401).json({
					sucess: false,
					message: error
				});
			}
			passport.authenticate('local-login', {}, (error, user, message) => {
				if (error) {
					debug(`Error logging user in: ${error}`);
					return res.status(401).json({
						auth: false,
						message: error
					});
				}
				const token = jwt.sign({ data: user }, process.env.SECRET, {});
				return res.status(200).json({
					auth: true,
					token,
					redirectURL: '/'
				});
			})(req, res, next);
		})(req, res, next);
	});


module.exports = app;
