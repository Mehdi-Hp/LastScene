const app = require('express')();
const debug = require('debug')('development');
const User = require('../../models/user');
const getMovie = require('../../services/getMovie');

app.route('/')
	.post((req, res, next) => {
		const imdbID = req.body.imdb_id;
		const user = new User(req.user);
		getMovie(imdbID);
		user.findByIdAndAddMovie(user, imdbID).then((updatedUser) => {
			res.json({
				updatedUser
			});
		}).catch((error) => {
			debug(`ERROR adding movie: ${error.message}`);
			res.status(error.status).json({
				error: true,
				message: error.message
			})
		});
	});

module.exports = app;
