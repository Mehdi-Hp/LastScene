const mongoose = require('mongoose');
const slugHero = require('mongoose-slug-hero');
const shortid = require('shortid');

const moviesSubSchema = new mongoose.Schema(
	{
		information: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Movie'
		}
	},
	{
		timestamps: true
	}
);

const listSchema = new mongoose.Schema(
	{
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
			ref: 'User'
		},
		points: Number,
		note: String,
		followers: {
			type: [String],
			writable: false
		},
		movies: [moviesSubSchema]
	},
	{
		timestamps: true
	}
);

listSchema.plugin(slugHero, {
	doc: 'list',
	field: 'name'
});

const List = mongoose.model('List', listSchema);
module.exports = List;
