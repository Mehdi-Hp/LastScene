const _ = require('lodash');
const debug = require('debug')('app:movieQueue');
const chalk = require('chalk');

const queue = [];

module.exports = (imdbID) => {
	return {
		get: () => {
			debug('Getting movie queue...');
			return queue;
		},
		add: (imdbID) => {
			debug(chalk.bold(`Set movie queue [${imdbID}]...`));
			queue.push(imdbID);
		},
		delete: (imdbID) => {
			debug(chalk.bold(`Deleted movie queue [${imdbID}]...`));
			_.pull(queue, imdbID);
		},
		isThere: (imdbID) => {
			return queue.some((inQueue) => {
				return inQueue === imdbID;
			});
		}
	};
};
