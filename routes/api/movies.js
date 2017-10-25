const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const _ = require('lodash');
const User = require('../../models/user');
const Movie = require('../../models/movie');
const getMovie = require('../../services/getMovie');
const currentOrCustomUser = require('../../restricts/currentOrCustomUser');

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
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR adding movie: ${error.message}`);
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
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR deleting movie: ${error.message}`);
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqMovies = req.body;
		const user = new User(req.user);
		Promise.all(User.findOneAndUpdateMovie(user, reqMovies)).then((updatedUser) => {
			res.status(200).json(updatedUser.pop());
		}).catch((error) => {
			debug(`ERROR updating movie: ${error.message}`);
			res.status(error.status).json({
				message: error.message
			});
		});
	});

app.route('/:movie_id')
	.get((req, res, next) => {
		let theUsername;
		if (res.locals.customUser) {
			debug(`Getting [${res.locals.customUser}]'s' movie [${req.params.movie_id}]`);
			theUsername = res.locals.customUser;
		} else {
			debug(`Getting user movie [${req.params.movie_id}]`);
			theUsername = req.user.username;
		}
		const imdbID = req.params.movie_id;
		User.findOne({
			username: theUsername,
			'movies.imdbID': imdbID
		}).select('movies').then((foundedMoviesOfUser) => {
			let foundedMovieOfUser = _.find(foundedMoviesOfUser.movies, {
				imdbID
			});
			foundedMovieOfUser = _.omit(foundedMovieOfUser, imdbID);
			debug(foundedMovieOfUser);
			if (!foundedMovieOfUser) {
				return res.status(404).json({
					user: theUsername,
					message: `User [${theUsername}] doesn't have movie [${imdbID}]`
				});
			}
			Movie.findOne({
				'id.imdb': imdbID
			}).then((foundedMovie) => {
				res.status(200).json({
					user: theUsername,
					userDate: foundedMovieOfUser,
					data: foundedMovie
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
				message: `Couldn't find user [${theUsername}].`
			});
		});
	})
	.delete((req, res, next) => {
		currentOrCustomUser(req, res);
		const imdbID = [req.params.movie_id];
		const user = new User(req.user);
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
		currentOrCustomUser(req, res);
		const reqMovie = req.body;
		reqMovie[0].imdbID = req.params.movie_id;
		const user = new User(req.user);
		debug(reqMovie);
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
