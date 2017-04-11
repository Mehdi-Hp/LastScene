const app = require('express')();
const mdb = require('../services/mdbService');
const apiKeys = require('../config/apiKeys');

app.route('/movie/:id')
	.get((req, res, next) => {
		mdb.getMovie(
			req.params.id,
			apiKeys.tmdb.v3
		)
		.then((movie) => {
			res.send(movie);
		})
		.catch((error) => {
			res.send(error);
		});
	});

module.exports = app;
