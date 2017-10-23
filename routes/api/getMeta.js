const app = require('express')();
const _ = require('lodash');
const debug = require('debug')('development');
const tmdbIDToImdbID = require('../../services/tmdbIDToImdbID');
const getMovie = require('../../services/getMovie');

app.route('/movie/:id')
	.get((req, res, next) => {
		if (req.query.id_type === 'tmdb') {
			req.params.id = tmdbIDToImdbID(req.params.id).then((imdbID) => {
				getMovie(imdbID).then((gottedMovie) => {
					res.json(gottedMovie);
				}).catch((error) => {
					debug(`ERROR: ${error}`);
					res.status(500).json(error);
				});
			});
		}
		req.params.id = _.startsWith(req.params.id, 'tt') ? req.params.id : `tt${req.params.id}`;
		getMovie(req.params.id).then((gottedMovie) => {
			res.json(gottedMovie);
		}).catch((error) => {
			debug(`ERROR: ${error}`);
			res.status(500).json({
				message: error
			});
		});
	});

module.exports = app;
