const app = require('express')();
const _ = require('lodash');
const debug = require('debug')('app:getMeta');
const tmdbService = require('../../services/tmdbService');
const getMovie = require('../../services/getMovie');

app.route('/movie/:id').get((req, res, next) => {
	if (req.query.id_type === 'tmdb') {
		req.params.id = tmdbService.findImdbID(req.params.id).then((imdbID) => {
			const tmdbID = req.params.id;
			getMovie(imdbID, tmdbID)
				.then((gottedMovie) => {
					res.json(gottedMovie);
				})
				.catch((error) => {
					debug(`ERROR: ${error}`);
					res.status(500).json(error);
				});
		});
	}
	req.params.id = _.startsWith(req.params.id, 'tt') ? req.params.id : `tt${req.params.id}`;
	getMovie(req.params.id)
		.then((gottedMovie) => {
			res.json(gottedMovie);
		})
		.catch((error) => {
			debug(`ERROR: ${error}`);
			res.status(500).json({
				message: error
			});
		});
});

module.exports = app;
