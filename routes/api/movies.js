const app = require('express')();
const debug = require('debug')('app:moviesRoute');
const chalk = require('chalk');
const _ = require('lodash');
const isUndefined = require('is-undefined');
const User = require('../../models/user');
const movieService = require('../../services/movieService');
const currentOrCustomUser = require('../../restricts/currentOrCustomUser');

app.route('/').get((req, res, next) => {
	let theUsername;
	if (res.locals.customUser) {
		debug(chalk.yellow(`Getting [${res.locals.customUser}]'s movies...`));
		theUsername = res.locals.customUser;
	} else {
		debug(chalk.yellow('Getting user movies...'));
		theUsername = req.user.username;
	}
	const { favourite, watched, watchList } = req.query;
	User.findOne({
		username: theUsername
	})
		.populate({
			path: 'movies._id',
			model: 'Movie'
		})
		.then((user) => {
			if (!user) {
				res.status(404).json({
					message: `Couldn't find user ${theUsername}.`
				});
			}
			if (!isUndefined(favourite)) {
				user.movies = user.movies.filter((movie) => {
					return movie.favourite === Boolean(String(favourite) !== 'false');
				});
			}
			if (!isUndefined(watched)) {
				user.movies = user.movies.filter((movie) => {
					return movie.watched === Boolean(String(watched) !== 'false');
				});
			}
			if (!isUndefined(watchList)) {
				user.movies = user.movies.filter((movie) => {
					return movie.watchList === Boolean(String(watchList) !== 'false');
				});
			}
			res.status(200).json({
				user: user.username,
				data: user.movies
			});
		})
		.catch((error) => {
			debug(chalk.bold.red(error));
			res.status(500).json({
				message: `Couldn't find user ${theUsername}, because of database error`
			});
		});
});

app
	.route('/:movie_id')
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
		})
			.populate({
				path: 'movies._id',
				model: 'Movie'
			})
			.then((user) => {
				if (!user) {
					res.status(404).json({
						error: true,
						message: `Couldn't find user ${theUsername}.`
					});
				}
				res.status(200).json({
					user: theUsername,
					data: _.find(user.movies, { _id: { _id: movieID } })
				});
			})
			.catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					error: true,
					message: `Couldn't find user ${theUsername}, because of database error`
				});
			});
	})
	.post((req, res, next) => {
		currentOrCustomUser(req, res);
		const imdbID = req.params.movie_id;
		const forceUpdate = req.query.force_update;
		const user = new User(req.user);
		if (!imdbID || !imdbID.length) {
			return res.status(400).json({
				message: "Your request doesn't fit in the standards"
			});
		}
		movieService.getComplete(imdbID, forceUpdate);
		if (!forceUpdate) {
			user
				.findOneAndAddMovie(user, imdbID)
				.then((updatedUser) => {
					return res.status(200).json(updatedUser);
				})
				.catch((error) => {
					return res.status(error.status).json({
						message: error.message
					});
				});
		} else {
			User.findOne({
				_id: user._id,
				'movies._id': imdbID
			})
				.populate({
					path: 'movies._id',
					model: 'Movie'
				})
				.lean()
				.then((user) => {
					const updatingMovie = user.movies.find((currentMovie) => {
						return currentMovie._id._id === imdbID;
					});
					updatingMovie._id.updating = true;
					return res.status(200).json(updatingMovie);
				})
				.catch((error) => {
					res.status(500).json({
						error: true,
						message: `Database error finding movie: [${imdbID}]`
					});
				});
		}
	})
	.delete((req, res, next) => {
		currentOrCustomUser(req, res);
		const imdbID = [req.params.movie_id];
		const user = new User(req.user);
		Promise.all(user.findOneAndDeleteMovie(user, imdbID))
			.then((updatedUser) => {
				res.status(200).json(updatedUser);
			})
			.catch((error) => {
				res.status(error.status).json({
					message: error.message
				});
			});
	})
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqMovie = [req.body];
		reqMovie[0]._id = req.params.movie_id;
		const user = new User(req.user);
		Promise.all(user.findOneAndUpdateMovie(user, reqMovie))
			.then((updatedUser) => {
				res.status(200).json(updatedUser.pop());
			})
			.catch((error) => {
				debug(`ERROR updating movie: ${error.message}`);
				res.status(error.status).json({
					message: error.message
				});
			});
	});

module.exports = app;
