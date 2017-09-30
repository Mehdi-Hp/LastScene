const app = require('express')();

app.use('/login', require('./authenticate/login'));
app.use('/signup', require('./authenticate/signup'));
app.use('/token', require('./authenticate/token'));

module.exports = app;
