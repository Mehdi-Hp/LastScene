const router = require('express').Router();
const path = require('path');
const isThere = require('is-there');
const debug = require('debug')('development');
const chalk = require('chalk');
const fileName = require('file-name');
const movieService = require('../services/movieService');
const Movie = require('../models/movie');

router.use((req, res, next) => {
	if (!isThere(`./public/files/${req.path}`)) {
		debug(chalk.red(`Founde no image at ${req.path}`));
		const imdbID = fileName(req.path).slice(0, fileName(req.path).indexOf('--'));
		Movie.findByIdAndUpdate(imdbID, {
			loading: true
		})
			.then(() => {
				movieService.getPoster(imdbID)
					.then((poster) => {
						Movie.findByIdAndUpdate(imdbID, {
							loading: false
						}).then(() => {
							res.status(200).sendFile(path.join(__dirname, `./public/files/${req.path}`));
						});
					})
					.catch((error) => {
						res.status(error.status).send(error);
					});
			});
	}
});

module.exports = router;
