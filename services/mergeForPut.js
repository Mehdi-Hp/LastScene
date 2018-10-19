const _ = require('lodash');

module.exports = (rawSource, rawRequest) => {
	const source = rawSource.toJSON();
	let merged = rawSource;
	const request = _.omit(rawRequest, [
		'slug',
		'slugs',
		'createdAt',
		'modifiedAt',
		'_id',
		'followers',
		'__v',
		'owner'
	]);
	_.forOwn(source, (value, key) => {
		if (request[key]) {
			if (_.isArray(request[key])) {
				request[key].forEach((objectInArray) => {
					merged[key] = _.merge(source[key], request[key]);
				});
			} else {
				merged[key] = request[key];
			}
		}
	});
	merged._id = rawSource._id;
	merged = _.omit(merged, [
		'slug',
		'createdAt',
		'modifiedAt',
		'followers',
		'__v',
		'owner'
	]);

	_.forOwn(rawSource, (value, key) => {
		if (merged[key]) {
			rawSource[key] = merged[key];
		}
	});
	return rawSource;
};
