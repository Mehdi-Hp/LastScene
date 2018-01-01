const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	_id: {
		type: String
	},
	title: {
		type: String
	},

	originalTitle: String,

	id: new Schema({
		imdb: {
			type: String,
			required: true
		},
		tmdb: String
	}, { _id: false }),

	url: new Schema({
		imdb: String
	}, { _id: false }),

	year: String,

	rate: new Schema({
		imdb: String,
		metascore: String
	}, { _id: false }),

	runtime: String,

	images: new Schema({
		poster: new Schema({
			small: String,
			medium: String,
			big: String
		}, { _id: false }),
		backdrop: new Schema({
			small: String,
			medium: String,
			big: String
		}, { _id: false })
	}, { _id: false }),

	plot: new Schema({
		simple: String,
		full: String
	}, { _id: false }),

	trailer: String,

	languages: [String],

	genres: [String],

	directors: [new Schema({
		name: String,
		id: String
	}, { _id: false })],

	writers: [new Schema({
		name: String,
		id: String
	}, { _id: false })],

	actors: [new Schema({
		name: String,
		id: String,
		profile: String,
		character: String
	}, { _id: false })],

	awards: [new Schema({
		name: String,
		year: String,
		categories: [new Schema({
			title: String,
			result: String,
			participants: [new Schema({
				name: String
			}, { _id: false })]
		}, { _id: false })]
	}, { _id: false })]
});
movieSchema.plugin(timestamps);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
