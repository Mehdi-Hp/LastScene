const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
// const Movie = require('../classes/movie');

let movies = {};

const imdbService = {
	getMovie: (information) => {
		const requestOptions = {
			method: 'GET',
			url: `http://www.imdb.com/title/tt${information.imdbID}`,
			qs: {},
			json: true
		};
		return new Promise((resolve, reject) => {
			request(requestOptions, (error, res, html) => {
				if (error) {
					reject(error);
				}
				const $ = cheerio.load(html);
				console.log($('.title_wrapper h1').text());
				console.log(_.trim($('.title_wrapper h1').text(), '('));
				resolve(movies);
			});
		});
	}
};

module.exports = imdbService;
