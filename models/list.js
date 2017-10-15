const mongoose = require('mongoose');
const User = require('./user');
const patcher = require('mongoose-json-patch');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const moviesSubSchema = new Schema({
	imdbID: {
		type: String,
		required: true
	}
}, { _id: false });
moviesSubSchema.plugin(timestamps);

const listSchema = new Schema({
	name: String,
	slug: String,
	description: String,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		writable: false,
		ref: User
	},
	points: Number,
	followers: {
		type: [String],
		writable: false
	},
	movies: [moviesSubSchema]
});

listSchema.plugin(patcher);
listSchema.plugin(timestamps);

const List = mongoose.model('List', listSchema);
module.exports = List;
