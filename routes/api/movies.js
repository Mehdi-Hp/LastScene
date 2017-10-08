const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
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
				return res.json({
					user: theUsername,
					data: null
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
				res.json({
					user: theUsername,
					data: foundedMovies
				});
			}).catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					error: true,
					message: 'Could not get movies.'
				});
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(400).json({
				error: true,
				message: 'Could not find user.'
			});
		});
	})
	.post((req, res, next) => {
		const imdbID = req.body.imdb_id;
		const user = new User(req.user);
		getMovie(imdbID);
		user.findOneAndAddMovie(user, imdbID).then((updatedUser) => {
			res.json({
				updatedUser
			});
		}).catch((error) => {
			debug(`ERROR adding movie: ${error.message}`);
			res.status(error.status).json({
				error: true,
				message: error.message
			});
		});
	});

module.exports = app;
