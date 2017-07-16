const app = require('express')();
const mdb = require('../../services/mdbService');
const apiKeys = require('../../config/apiKeys');

app.route('/movie/:name')
	.get((req, res, next) => {
		mdb.searchMovie(
				req.params.name,
				req.query.year || undefined,
				req.query.page || undefined,
				apiKeys.tmdb.v3
			)
			.then((movies) => {
				res.send(movies);
			})
			.catch((error) => {
				res.send(error);
			});
	});

app.route('/tvshow/:name')
	.get((req, res, next) => {});

app.route('/person/:name')
	.get((req, res, next) => {});

module.exports = app;
