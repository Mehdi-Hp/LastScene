const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/allRoutes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

// error handler
app.use((error, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = error.message;
	res.locals.error = req.app.get('env') === 'development' ? error : {};

	// render the error page
	res.status(error.status || 500);
	res.render('error');
});

module.exports = app;
