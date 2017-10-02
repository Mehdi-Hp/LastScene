const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const debug = require('debug')('development');
const isThere = require('is-there');
const generateBackdrops = require('./generateBackdrops');

const data = {};

module.exports = (backdropLink, backdropName) => {
	return new Promise((resolve, reject) => {
		if (!isThere(`./public/files/backdrop/${backdropName}`) && !isThere(`./public/files/backdrop/${backdropName}.jpeg`)) {
			request(backdropLink, (error, response) => {
				if (error) {
					reject(error);
				}
				data.contentType = _.split(response.headers['content-type'], '/')[1];
			}).pipe(fs.createWriteStream(`./public/files/backdrop/${backdropName}`)).on('finish', () => {
				generateBackdrops(`./public/files/backdrop/${backdropName}`).then((generatedBackdrops) => {
					debug('Deleting the original backdrop...');
					fs.unlink(`./public/files/backdrop/${backdropName}`, (error) => {
						if (error) {
							debug(`ERROR deleting backdrop: ${error}`);
						}
						debug('Original backdrop has been deleted.');
					});
					resolve(generatedBackdrops);
				});
			}).on('error', (error) => {
				if (error) {
					reject(error);
				}
			});
		} else {
			resolve({
				small: `./public/files/backdrop/${backdropName}--small.jpeg`,
				medium: `./public/files/backdrop/${backdropName}--medium.jpeg`,
				big: `./public/files/backdrop/${backdropName}--big.jpeg`
			});
		}
	});
};
