const app = require('express')();

app.route('/')
	.get((req, res, next) => {
		res.send('api');
	});

app.use('/getmeta', require('./getMetaRoute'));
app.use('/findmeta', require('./findMetaRoute'));

module.exports = app;
