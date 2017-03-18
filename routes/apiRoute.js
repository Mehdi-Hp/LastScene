const router = require('express').Router();
const tmdb = require('../services/tmdbService');

router.get('/', (req, res, next) => {
	res.send('api');
});
router.get('/getMeta/:name', (req, res, next) => {
	tmdb.searchMovie(req.params.name)
		.then((movies) => {
			res.send(movies);
		})
		.catch((error) => {
			res.send(error);
		});
});

module.exports = router;
