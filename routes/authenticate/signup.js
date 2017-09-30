const app = require('express')();
const passport = require('passport');
const debug = require('debug')('development');

app.route('/')
	.get((req, res, next) => {
		res.render('signup.ejs');
	})
	.post((req, res, next) => {
		debug('SIGNUP ROUTE...');
		debug(req.body);
		passport.authenticate('local-signup', {}, (error, user, message) => {
			if (error) {
				res.status(401).json({
					sucess: false,
					message: error
				});
			} else {
				res.json({
					sucess: true,
					message
				});
			}
		})(req, res, next);
	});


module.exports = app;
