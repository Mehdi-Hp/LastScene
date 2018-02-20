// const _ = require('lodash');
const events = require('events');
const debug = require('debug')('development');
const chalk = require('chalk');
const myapifilmsService = require('./myapifilmsService');
const Movie = require('../models/movie');
const movieQueue = require('../config/movieQueue')();

const getMovieEvent = new events.EventEmitter();

module.exports = (imdbIDs) => {
	
};
