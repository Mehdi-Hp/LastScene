const app = require('express')();

app.route('/')
	.get((req, res, next) => {
		res.send('api => GET');
	});

app.use('/findmeta', require('./api/findMeta'));
app.use('/getmeta', require('./api/getMeta'));

module.exports = app;
