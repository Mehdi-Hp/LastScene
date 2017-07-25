const app = require('express')();
const tmdb = require('../../services/tmdbService');

app.route('/movie/:title')
	.get((req, res, next) => {
		tmdb.findMovie({
			title: req.params.title
		})
		.then((movies) => {
			res.send(movies);
		})
		.catch((error) => {
			res.send(error);
		});
	});

module.exports = app;
