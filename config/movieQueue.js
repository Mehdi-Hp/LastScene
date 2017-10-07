const _ = require('lodash');
const debug = require('debug')('development');

const queue = ['tt3352399'];

module.exports = () => {
	return {
		get: () => {
			debug('Getting movie queue...');
			return queue;
		},
		add: (imdbID) => {
			debug('Setting movie queue...');
			queue.push(imdbID);
		},
		delete: (imdbID) => {
			debug('Deleting movie queue...');
			_.pull(queue, imdbID);
		},
		isThere: (imdbID) => {
			return queue.some((inQueue) => {
				return inQueue === imdbID;
			});
		}
	}
}
