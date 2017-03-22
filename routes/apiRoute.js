const app = require('express')();
const imdb = require('../services/imdbService');

app.route('/')
	.get((req, res, next) => {
		res.send('api');
	});

app.route('/getMovie/:name')
	.get((req, res, next) => {
		imdb.searchMovie(req.params.name)
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
				res.json(persons);
			})
			.catch((error) => {
				res.send(error);
			});
	});

module.exports = app;
