const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const movieSchema = new mongoose.Schema({
	_id: {
		type: String
	},

	title: {
		type: String
	},

	originalTitle: String,

	id: new mongoose.Schema({
		imdb: {
			type: String,
			required: true
		},
		tmdb: String
	}, { _id: false }),

	url: new mongoose.Schema({
		imdb: String
	}, { _id: false }),

	year: String,

	rate: new mongoose.Schema({
		imdb: Number,
		metascore: Number
	}, { _id: false }),

	runtime: String,

	images: new mongoose.Schema({
		poster: new mongoose.Schema({
			small: String,
			medium: String,
			big: String
		}, { _id: false }),
		backdrop: new mongoose.Schema({
			small: String,
			medium: String,
			big: String
		}, { _id: false })
	}, { _id: false }),

	plot: new mongoose.Schema({
		simple: String,
		full: String
	}, { _id: false }),

	trailer: String,

	languages: [String],

	genres: [String],

	countries: [String],

	directors: [new mongoose.Schema({
		name: String,
		id: String
	}, { _id: false })],

	writers: [new mongoose.Schema({
		name: String,
		id: String
	}, { _id: false })],

	actors: [new mongoose.Schema({
		name: String,
		id: String,
		profile: String,
		character: String
	}, { _id: false })],

	awards: [new mongoose.Schema({
		name: String,
		year: String,
		categories: [new mongoose.Schema({
			title: String,
			result: String,
			participants: [new mongoose.Schema({
				name: String
			}, { _id: false })]
		}, { _id: false })]
	}, { _id: false })],

	loading: Boolean,
	fulfilled: Boolean
});
movieSchema.plugin(timestamps);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
