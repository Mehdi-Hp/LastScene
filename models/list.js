const mongoose = require('mongoose');
const User = require('./user');
const slugHero = require('mongoose-slug-hero');
const shortid = require('shortid');
const Movie = require('./movie');

const Schema = mongoose.Schema;

const moviesSubSchema = new Schema({
	_id: {
		type: String,
		required: true,
		ref: Movie
	}
}, {
	timestamps: true
});

const listSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	name: String,
	slug: {
		type: String,
		slugn: 'name',
		slug_padding_size: 3,
		unique: true,
		writable: false
	},
	description: String,
	owner: {
		type: String,
		ref: User
	},
	points: Number,
	note: String,
	followers: {
		type: [String],
		writable: false
	},
	movies: [moviesSubSchema]
}, {
	timestamps: true
});

listSchema.plugin(slugHero, {
	doc: 'list',
	field: 'name'
});

const List = mongoose.model('List', listSchema);
module.exports = List;
