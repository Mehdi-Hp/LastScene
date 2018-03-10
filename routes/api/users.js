const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const User = require('../../models/user');
const movieService = require('../../services/movieService');

app.route('/:username?')
	.get((req, res, next) => {
		let theUsername;
		if (!req.params.username || req.params.username === req.user.username) {
			debug(chalk.yellow('Getting user data...'));
			theUsername = req.user.username;
		}	else if (req.params.username !== req.user.username) {
			debug(chalk.yellow(`Getting [${res.locals.customUser}]'s data...`));
			theUsername = req.params.username;
		}
		User.findOne({ username: theUsername })
			.select('-authentication')
			.populate({
				path: 'movies._id',
				model: 'Movie',
				select: [
					'-__v'
				]
			}).populate({
				path: 'lists._id',
				model: 'List'
			})
			.then((user) => {
				user.movies.forEach((movie) => {
					if (!movie._id.fulfilled) {
						debug(chalk.yellow(`The movie ${movie._id._id} is not in database. Getting it...`));
						movieService.getComplete(movie._id._id);
					}
				});
				if (!user) {
					res.status(404).json({
						message: `Couldn't find user ${theUsername}.`
					});
				}
				res.status(200).json({
					user: theUsername,
					data: user
				});
			})
			.catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					error: true,
					message: `Couldn't find user ${theUsername}, because of database error`
				});
			});
	});

module.exports = app;
