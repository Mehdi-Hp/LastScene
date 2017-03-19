const app = require('express')();
const tmdb = require('../services/tmdbService');

app.route('/')
	.get((req, res, next) => {
		res.send('api');
	});

app.route('/getMovie/:name')
	.get((req, res, next) => {
		tmdb.searchMovie(
				req.params.name,
				req.query.year || undefined,
				req.query.lang || undefined,
				req.query.adult || undefined,
				req.query.page || undefined
			)
			.then((movies) => {
				res.send(movies);
			})
			.catch((error) => {
				res.send(error);
			});
	});

app.route('/getTVShow/:name')
	.get((req, res, next) => {
		tmdb.searchTVShow(
				req.params.name,
				req.query.lang || undefined,
				req.query.page || undefined
			)
			.then((tvShows) => {
				res.send(tvShows);
			})
			.catch((error) => {
				res.send(error);
			});
	});

app.route('/getPerson/:name')
	.get((req, res, next) => {
		tmdb.searchPerson(
				req.params.name,
				req.query.lang || undefined,
				req.query.adult || undefined,
				req.query.region || undefined,
				req.query.page || undefined
			)
			.then((persons) => {
				res.send(persons);
			})
			.catch((error) => {
				res.send(error);
			});
	});

module.exports = app;
