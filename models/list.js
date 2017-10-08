const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
	name: String,
	slug: String,
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
	movies: [new Schema({
		imdbID: {
			type: String,
			required: true
		},
		addedOn: {
			type: Date,
			default: Date.now()
		}
	}, { _id: false })]
});

const List = mongoose.model('List', listSchema);
module.exports = List;
