const app = require('express')();
const movieService = require('../../services/movieService');

app.route('/movie/:title')
	.get((req, res, next) => {
		movieService.search({
			title: req.params.title
		}).then((movies) => {
			if (!movies.length) {
				res.status(404).json({});
			}
			res.status(200).json(movies);
		}).catch((error) => {
			res.status(error.status).json({
				error: true,
				message: error.message
			});
		});
	});

module.exports = app;
