const app = require('express')();

app.use('/logout', require('./authenticate/logout'));
app.use('/check', require('./authenticate/check'));

app.use('/login', require('./authenticate/login'));
app.use('/signup', require('./authenticate/signup'));
app.use('/google', require('./authenticate/google'));

module.exports = app;
