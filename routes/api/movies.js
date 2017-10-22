const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const _ = require('lodash');
const User = require('../../models/user');
const Movie = require('../../models/movie');
const getMovie = require('../../services/getMovie');

app.route('/')
	.get((req, res, next) => {
		let theUsername;
		if (res.locals.customUser) {
			debug(`Getting ${res.locals.customUser}'s movies`);
			theUsername = res.locals.customUser;
		} else {
			debug('Getting user movies');
			theUsername = req.user.username;
		}
		User.findOne({ username: theUsername }).then((user) => {
			if (!user.movies) {
				return res.status(200).json({
					user: theUsername,
					data: {}
				});
			}
			const movies = user.movies.map((movie) => {
				return movie.imdbID;
			});
			Movie.find(
				{
					'id.imdb': {
						$in: movies
					}
				}
			).then((foundedMovies) => {
				res.status(200).json({
					user: theUsername,
					data: foundedMovies
				});
			}).catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					message: 'Could not get movies, because of databse error'
				});
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(404).json({
				message: `Couldn't find user ${theUsername}.`
			});
		});
	})
	.post((req, res, next) => {
		if (res.locals.customUser && res.locals.customUser !== req.user.username) {
			return res.status(403).json({
				message: `You don't have permission to change data for ${res.locals.customUser}`
			});
		}
		const imdbID = req.body.imdbID;
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
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR adding movie: ${error.message}`);
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.delete((req, res, next) => {
		if (res.locals.customUser && res.locals.customUser !== req.user.username) {
			return res.status(403).json({
				message: `You don't have permission to change data for ${res.locals.customUser}`
			});
		}
		const imdbID = req.body.imdbID;
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
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR deleting movie: ${error.message}`);
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.put((req, res, next) => {
		if (res.locals.customUser && res.locals.customUser !== req.user.username) {
			return res.status(403).json({
				message: `You don't have permission to change data for ${res.locals.customUser}`
			});
		}
		const movies = req.body;
		const user = new User(req.user);
		Promise.all(user.findOneAndUpdateMovie(user, movies)).then((updatedUser) => {
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR updating movie: ${error.message}`);
			res.status(error.status).json({
				message: error.message
			});
		});
	});


module.exports = app;
