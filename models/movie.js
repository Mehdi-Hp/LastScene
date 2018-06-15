const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const movieSchema = new mongoose.Schema({
	_id: {
		type: String
	},

	title: {
		type: String,
		lowercase: true,
		trim: true
	},

	originalTitle: {
		type: String,
		lowercase: true,
		trim: true
	},

	id: new mongoose.Schema(
		{
			imdb: {
				type: String,
				required: true
			},
			tmdb: String
		},
		{ _id: false }
	),

	url: new mongoose.Schema(
		{
			imdb: String
		},
		{ _id: false }
	),

	year: String,

	rate: new mongoose.Schema(
		{
			imdb: Number,
			metascore: Number
		},
		{ _id: false }
	),

	runtime: String,

	images: new mongoose.Schema(
		{
			poster: String,
			backdrop: String
		},
		{ _id: false }
	),

	plot: new mongoose.Schema(
		{
			simple: String,
			full: String
		},
		{ _id: false }
	),

	trailer: String,

	languages: {
		type: [String],
		lowercase: true,
		trim: true
	},

	genres: {
		type: [String],
		lowercase: true,
		trim: true
	},

	countries: {
		type: [String],
		lowercase: true,
		trim: true
	},

	budget: String,

	directors: [
		new mongoose.Schema(
			{
				name: {
					type: String,
					lowercase: true,
					trim: true
				},
				id: String
			},
			{ _id: false }
		)
	],

	writers: [
		new mongoose.Schema(
			{
				name: {
					type: String,
					lowercase: true,
					trim: true
				},
				id: String
			},
			{ _id: false }
		)
	],

	actors: [
		new mongoose.Schema(
			{
				name: {
					type: String,
					lowercase: true,
					trim: true
				},
				id: {
					type: String,
					lowercase: true,
					trim: true
				},
				character: {
					type: String,
					lowercase: true,
					trim: true
				},
				picture: {
					type: String,
					lowercase: true,
					trim: true
				}
			},
			{ _id: false }
		)
	],

	awards: {
		summary: {
			type: String,
			trim: true
		},
		full: [
			new mongoose.Schema(
				{
					name: {
						type: String,
						lowercase: true,
						trim: true
					},
					title: {
						type: String,
						lowercase: true,
						trim: true
					},
					year: {
						type: Number,
						trim: true
					},
					outcomes: [
						new mongoose.Schema(
							{
								result: {
									type: String,
									lowercase: true,
									trim: true
								},
								award: {
									type: String,
									lowercase: true,
									trim: true
								},
								category: {
									type: String,
									lowercase: true,
									trim: true
								},
								participants: {
									type: [String],
									lowercase: true,
									trim: true
								}
							},
							{ _id: false }
						)
					]
				},
				{ _id: false }
			)
		]
	},

	loading: Boolean,
	fulfilled: Boolean,
	updating: Boolean
});
movieSchema.plugin(timestamps);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
