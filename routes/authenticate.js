const app = require('express')();

app.use('/login', require('./authenticate/login'));
app.use('/logout', require('./authenticate/logout'));
app.use('/signup', require('./authenticate/signup'));
app.use('/check', require('./authenticate/check'));

module.exports = app;
