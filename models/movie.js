const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: {
		type: String,
		required: true
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
		outcomes: [new Schema({
			name: String,
			categories: [new Schema({
				name: String,
				by: [new Schema({
					name: String,
					id: String
				}, { _id: false })]
			}, { _id: false })]
		}, { _id: false })]
	}, { _id: false })]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
