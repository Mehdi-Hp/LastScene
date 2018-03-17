const request = require('request');
const debug = require('debug')('filestackService');
const chalk = require('chalk');

module.exports = {
	storeURL(url, filename, path) {
		return new Promise((resolve, reject) => {
			debug(chalk.blue(`Storing ${url} in filestack as [${path}${filename}]`));
			const requestOptions = {
				method: 'POST',
				url: `https://www.filestackapi.com/api/store/S3?key=${process.env.FILESTACK}`,
				qs: {
					url,
					filename,
					path
				},
				json: true
			};
			request(requestOptions, (error, response) => {
				if (error) {
					debug(chalk.bold.red(error));
					reject({
						error: true,
						status: 500,
						message: 'Could not store poster'
					});
				}
				debug(chalk.blue(`Stored [${path}${filename}] in filestack: ${response.body.url}`));
				resolve(response.body.url);
			});
		});
	}
};
