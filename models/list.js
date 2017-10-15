const mongoose = require('mongoose');
const User = require('./user');
const patcher = require('mongoose-json-patch');
const timestamps = require('mongoose-timestamp');
const slugHero = require('mongoose-slug-hero');

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
	slug: {
		type: String,
		slugn: 'name',
		slug_padding_size: 3,
		unique: true
	},
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
listSchema.plugin(slugHero, {
	doc: 'list',
	field: 'name'
});

const List = mongoose.model('List', listSchema);
module.exports = List;
