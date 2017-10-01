const app = require('express')();

app.use('/login', require('./authenticate/login'));
app.use('/logout', require('./authenticate/logout'));
app.use('/signup', require('./authenticate/signup'));

module.exports = app;
