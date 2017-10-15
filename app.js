const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const webpack = require('webpack');
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackConfig = require('./webpack.config.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const secretKey = require('./config/secretKey');
const slugHero = require('mongoose-slug-hero');

slugHero.config.counter = 'slug_counters'

const DIST_DIR = path.join(__dirname, 'public', 'production');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
// const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV !== 'production';
const productionPath = path.resolve(__dirname, 'public/production');

const app = express();

require('./config/connectToDatabase')(mongoose);
require('./config/passport')(passport);

/* eslint-disable no-console */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet({}));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(productionPath));

app.use(session({
	secret: secretKey,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


if (isDevelopment) {
	// console.log(chalk.bold.magenta('*** IS DEVELOPMENT ENV ***'));
	// const compiler = webpack(webpackConfig);
	// app.use(webpackMiddleware(compiler, webpackConfig.devServer));
	// app.use(webpackHotMiddleware(compiler));
	// app.get('*', (req, res, next) => {
	// 	compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
	// 		if (err) return next(err);
	// 		res.set('content-type', 'text/html');
	// 		res.send(result);
	// 		res.end();
	// 	});
	// });
} else {
	console.log('*** IS PRODUCTION ENV ***');
	app.use(express.static(DIST_DIR));
	app.get('*', (req, res) => {
		res.sendFile(HTML_FILE);
	});
}

app.use(require('./routes/all'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

// error handler
app.use((error, req, res, next) => {
	res.locals.message = error.message;
	res.locals.error = req.app.get('env') === 'development' ? error : {};
	res.status(error.status || 500);
	res.render('error');
});

module.exports = app;
