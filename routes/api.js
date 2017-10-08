const app = require('express')();

app.route('/')
	.get((req, res, next) => {
		res.send('api => GET');
	});

app.use('/findmeta', require('./api/findMeta'));
app.use('/getmeta', require('./api/getMeta'));
app.use('/:username?/movies', (req, res, next) => {
	res.locals.customUser = req.params.username;
	next();
}, require('./api/movies'));

module.exports = app;
