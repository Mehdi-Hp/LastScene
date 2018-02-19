const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const debug = require('debug')('development');
const chalk = require('chalk');
const isThere = require('is-there');
const generateBackdrops = require('./generateBackdrops');

const data = {};

module.exports = (backdropLink, backdropName) => {
	return new Promise((resolve, reject) => {
		debug(chalk.dim(`Checking if there is backdrop for [${backdropName}]`));
		if (!isThere(`./public/files/backdrop/${backdropName}--small.jpeg`) || !isThere(`./public/files/backdrop/${backdropName}--medium.jpeg`) || !isThere(`./public/files/backdrop/${backdropName}--big.jpeg`)) {
			debug(chalk.dim(`No backdrop for [${backdropName}]. getting one...`));
			request(backdropLink, (error, response) => {
				if (error) {
					debug(chalk.bold.red(error));
					reject(error);
				}
				data.contentType = _.split(response.headers['content-type'], '/')[1];
				debug(chalk.dim(`Got backdrop for [${backdropName}]. generating diffrent sizes...`));
			}).pipe(fs.createWriteStream(`./public/files/backdrop/${backdropName}`)).on('finish', () => {
				generateBackdrops(`./public/files/backdrop/${backdropName}`).then((generatedBackdrops) => {
					debug('Deleting the original backdrop...');
					fs.unlink(`./public/files/backdrop/${backdropName}`, (error) => {
						if (error) {
							debug(chalk.bold.red(error));
							reject({
								status: 500,
								message: 'Faild to generate backdrop'
							});
						}
						debug('Original backdrop has been deleted.');
					});
					resolve(generatedBackdrops);
				});
			}).on('error', (error) => {
				debug(chalk.bold.red(error));
				reject({
					status: 500,
					message: error
				});
			});
		} else {
			resolve({
				small: `${backdropName}--small.jpeg`,
				medium: `${backdropName}--medium.jpeg`,
				big: `${backdropName}--big.jpeg`
			});
		}
	});
};
