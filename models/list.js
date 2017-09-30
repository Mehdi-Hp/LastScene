const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
	name: String,
	description: String,
	created: {
		type: Date,
		default: Date.now()
	},
	modified: {
		type: Date,
		default: Date.now()
	},
	owner: String,
	points: Number,
	followers: [String],
	movies: [String]
});

const List = mongoose.model('List', listSchema);
module.exports = List;
