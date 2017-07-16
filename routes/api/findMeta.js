const app = require('express')();
const myapifilms = require('../../services/myapifilmsService');

app.route('/movie/:title')
	.get((req, res, next) => {
		myapifilms.searchMovie({
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
