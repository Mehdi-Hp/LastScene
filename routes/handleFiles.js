const router = require('express').Router();
const isThere = require('is-there');
const debug = require('debug')('development');
const chalk = require('chalk');
const fileName = require('file-name');
const movieService = require('../services/movieService');

router.use((req, res, next) => {
	if (!isThere(`./public/files/${req.path}`)) {
		debug(chalk.red(`Founde no image at ${req.path}`));
		const imdbID = fileName(req.path).slice(0, fileName(req.path).indexOf('--'));
		movieService.getPoster(imdbID);
		res.status(200).json({
			loading: true
		});
	}
});

module.exports = router;
