const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const debug = require('debug')('development');
const chalk = require('chalk');
const isThere = require('is-there');
const generatePosters = require('./generatePosters');

const data = {};

module.exports = (posterLink, posterName) => {
	return new Promise((resolve, reject) => {
		debug(chalk.dim(`Checking if there is poster for [${posterName}]`));
		if (!isThere(`./public/files/poster/${posterName}--small.jpeg`) || !isThere(`./public/files/poster/${posterName}--medium.jpeg`) || !isThere(`./public/files/poster/${posterName}--big.jpeg`)) {
			debug(chalk.dim(`No poster for [${posterName}]. getting one...`));
			request(posterLink, (error, response) => {
				if (error) {
					debug(chalk.bold.red(error));
					return reject(error);
				}
				console.log(response);
				data.contentType = _.split(response.headers['content-type'], '/')[1];
				debug(chalk.dim(`Got poster for [${posterName}]. generating diffrent sizes...`));
			}).pipe(fs.createWriteStream(`./public/files/poster/${posterName}`)).on('finish', () => {
				generatePosters(`./public/files/poster/${posterName}`).then((generatedPosters) => {
					debug(chalk.dim(`Deleting the original poster of [${posterName}]...`));
					fs.unlink(`./public/files/poster/${posterName}`, (error) => {
						if (error) {
							debug(chalk.bold.red(error));
							reject({
								status: 500,
								message: 'Faild to generate poster'
							});
						}
						debug(chalk.dim(`Original poster of [${posterName}] has been deleted`));
					});
					resolve(generatedPosters);
				});
			}).on('error', (error) => {
				debug(chalk.bold.red(error));
				reject({
					status: 500,
					message: 'Couldn\'t get poster, because of database error'
				});
			});
		} else {
			debug(chalk.dim(`Poster of [${posterName}] already exist`));
			resolve({
				small: `${posterName}--small.jpeg`,
				medium: `${posterName}--medium.jpeg`,
				big: `${posterName}--big.jpeg`
			});
		}
	});
};
