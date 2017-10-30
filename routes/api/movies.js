const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const _ = require('lodash');
const User = require('../../models/user');
const getMovie = require('../../services/getMovie');
const currentOrCustomUser = require('../../restricts/currentOrCustomUser');

app.route('/')
	.get((req, res, next) => {
		let theUsername;
		if (res.locals.customUser) {
			debug(chalk.yellow(`Getting [${res.locals.customUser}]'s movies...`));
			theUsername = res.locals.customUser;
		} else {
			debug(chalk.yellow('Getting user movies...'));
			theUsername = req.user.username;
		}
		User.findOne({ username: theUsername }).populate({
			path: 'movies._id',
			model: 'Movie'
		}).then((user) => {
			if (!user) {
				res.status(404).json({
					message: `Couldn't find user ${theUsername}.`
				});
			}
			res.status(200).json({
				user: theUsername,
				data: user.movies
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(500).json({
				message: `Couldn't find user ${theUsername}, because of database error`
			});
		});
	})
	.post((req, res, next) => {
		currentOrCustomUser(req, res);
		const imdbID = req.body;
		const user = new User(req.user);
		if (imdbID === null) {
			return res.status(400).json({
				message: 'You should provide one or many imdbIDs in your request'
			});
		}
		if (!imdbID || !imdbID.length) {
			return res.status(400).json({
				message: 'Your request doesn\'t fit in our standards'
			});
		}
		getMovie(imdbID);
		Promise.all(user.findOneAndAddMovie(user, imdbID)).then((updatedUser) => {
			res.status(200).json(updatedUser);
		}).catch((error) => {
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.delete((req, res, next) => {
		currentOrCustomUser(req, res);
		const imdbID = req.body;
		const user = new User(req.user);
		if (imdbID === null) {
			return res.status(400).json({
				message: 'You should provide one or many imdbIDs in your request'
			});
		}
		if (!imdbID || !imdbID.length) {
			return res.status(400).json({
				message: 'Your request doesn\'t fit in our standards'
			});
		}
		Promise.all(user.findOneAndDeleteMovie(user, imdbID)).then((updatedUser) => {
			res.status(200).json(updatedUser);
		}).catch((error) => {
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqMovies = req.body;
		const user = new User(req.user);
		Promise.all(user.findOneAndUpdateMovie(user, reqMovies)).then((updatedUser) => {
			res.status(200).json(updatedUser);
		}).catch((error) => {
			res.status(error.status).json({
				message: error.message
			});
		});
	});

app.route('/:movie_id')
	.get((req, res, next) => {
		let theUsername;
		if (res.locals.customUser) {
			debug(`Getting [${res.locals.customUser}]'s movie [${req.params.movie_id}]`);
			theUsername = res.locals.customUser;
		} else {
			debug(`Getting user movie [${req.params.movie_id}]`);
			theUsername = req.user.username;
		}
		const movieID = req.params.movie_id;
		User.findOne({
			username: theUsername,
			'movies._id': movieID
		}).populate({
			path: 'movies._id',
			model: 'Movie'
		}).then((user) => {
			if (!user) {
				res.status(404).json({
					message: `Couldn't find user ${theUsername}.`
				});
			}
			res.status(200).json({
				user: theUsername,
				data: _.find(user.movies, { _id: { _id: movieID } })
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(500).json({
				message: `Couldn't find user ${theUsername}, because of database error`
			});
		});
	})
	.delete((req, res, next) => {
		currentOrCustomUser(req, res);
		const imdbID = [req.params.movie_id];
		const user = new User(req.user);
		Promise.all(user.findOneAndDeleteMovie(user, imdbID)).then((updatedUser) => {
			res.status(200).json(updatedUser);
		}).catch((error) => {
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqMovie = [req.body];
		const user = new User(req.user);
		Promise.all(user.findOneAndUpdateMovie(user, reqMovie)).then((updatedUser) => {
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR updating movie: ${error.message}`);
			res.status(error.status).json({
				message: error.message
			});
		});
	});


module.exports = app;
