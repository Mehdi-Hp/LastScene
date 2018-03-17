require('dotenv').config();
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const serveIndex = require('serve-index');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const slugHero = require('mongoose-slug-hero');
const cloudinary = require('cloudinary');
require('util').inspect.defaultOptions.depth = null;

slugHero.config.counter = 'slug_counters';

cloudinary.config({
	cloud_name: 'lastscene',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

require('./services/database').connect(mongoose);
require('./services/passport')(passport);

if (process.env.NODE_ENV === 'production') {
	console.log('---- PRODUCTION ENVIRONMENT ----');
	app.engine('html', ejs.renderFile);
	app.set('views', path.join(__dirname, '/public/production'));
	app.set('view engine', 'html');
} else {
	console.log('---- DEV ENVIRONMENT ----');
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
}

app.use(helmet({}));
app.use(cors());

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use('/production', express.static(path.join(__dirname, 'public/production')));
app.use('/files', require('./routes/handleFiles'));

if (process.env.NODE_ENV !== 'production') {
	app.use('/public', serveIndex('public'));
}

app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
	res.render('index');
});

module.exports = app;
