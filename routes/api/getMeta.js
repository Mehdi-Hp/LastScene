/* eslint-disable no-shadow */
const app = require('express')();
const _ = require('lodash');
const myapifilmsService = require('../../services/myapifilmsService');
const Movie = require('../../models/movie');

app.route('/movie/:imdb_id')
	.get((req, res, next) => {
		req.params.imdb_id = _.startsWith(req.params.imdb_id, 'tt') ? req.params.imdb_id : `tt${req.params.imdb_id}`;
		Movie.findOne({
			id: {
				imdb: req.params.imdb_id
			}
		}, (error, existedMovie) => {
			if (error) {
				res.send(error);
			}
			if (!existedMovie) {
				myapifilmsService.getMovie({
					imdbID: req.params.imdb_id
				})
				.then((movie) => {
					Movie.create(movie.data)
						.then((newMovie) => {
							res.send(newMovie);
						})
						.catch((error) => {
							res.send(error);
						});
				})
				.catch((error) => {
					res.status(error.status.code).send(error);
				});
			} else {
				res.send(new Movie(existedMovie));
			}
		});
	});

module.exports = app;
