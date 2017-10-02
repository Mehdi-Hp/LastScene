const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const debug = require('debug')('development');
const isThere = require('is-there');
const generatePosters = require('./generatePosters');

const data = {};

module.exports = (posterLink, posterName) => {
	return new Promise((resolve, reject) => {
		if (!isThere(`./public/files/poster/${posterName}`) && !isThere(`./public/files/poster/${posterName}.jpeg`)) {
			request(posterLink, (error, response) => {
				if (error) {
					reject(error);
				}
				data.contentType = _.split(response.headers['content-type'], '/')[1];
			}).pipe(fs.createWriteStream(`./public/files/poster/${posterName}`)).on('finish', () => {
				generatePosters(`./public/files/poster/${posterName}`).then((generatedPosters) => {
					debug('Deleting the original poster...');
					fs.unlink(`./public/files/poster/${posterName}`, (error) => {
						if (error) {
							debug(`ERROR: ${error}`);
						}
						debug('Original poster has been deleted.');
					});
					resolve(generatedPosters);
				});
			}).on('error', (error) => {
				if (error) {
					reject(error);
				}
			});
		} else {
			resolve({
				small: `./public/files/poster/${posterName}--small.jpeg`,
				medium: `./public/files/poster/${posterName}--medium.jpeg`,
				big: `./public/files/poster/${posterName}--big.jpeg`
			});
		}
	});
};
