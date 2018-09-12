const _ = require('lodash');
const User = require('../models/user');
const Movie = require('../models/movie');
const movieService = require('../services/movieService');

module.exports = {
	async getAll(request, h) {
		const { username } = request.params;
		try {
			const user = await User.findOne({
				username
			}).populate({
				path: 'movies.information',
				model: 'Movie'
			});
			if (!user) {
				return h.notFound(`Couldn't find user [${username}]`);
			}
			return {
				username: user.username,
				totalCount: user.movies && user.movies.length,
				data: user.movies
			};
		} catch ({ message }) {
			console.log(message);
			return h.badImplementation(`Couldn't fetch user [${username}]`);
		}
	},
	async getOne(request, h) {
		const { username, movieId } = request.params;
		const { user } = request.auth;
		try {
			const existedMovie = user.movies.toObject().find((movie) => {
				return movie.information.toJSON() === movieId;
			});
			if (!existedMovie) {
				return h.notFound(`Couldn't find movie [${movieId}] for user [${username}]`);
			}
			const populatedMovie = await Movie.findById(existedMovie.information.toJSON());
			return {
				username: user.username,
				...existedMovie,
				information: populatedMovie
			};
		} catch ({ message }) {
			console.log(message);
			return h.badImplementation(`Couldn't fetch movie [${movieId}]`);
		}
	},
	async add(request, h) {
		const { username } = request.params;
		const { imdbID } = request.payload;

		let movie = {};
		try {
			movie = await movieService.getComplete(imdbID);
		} catch (error) {
			return h.badImplementation(error);
		}
		if (!Object.keys(movie).length) {
			return h.notFound(`Couldn't find movie [${imdbID}]`);
		}
		const user = await User.findOne({
			username
		});
		if (!user) {
			return h.notFound(`Couldn't find user [${username}]`);
		}

		const movieAlreadyExist = user.movies.some((movie) => {
			return movie.information === imdbID;
		});
		if (movieAlreadyExist) {
			return h.conflict(`Movie [${imdbID}] already exist`);
		}

		user.movies.push({
			information: movie._id
		});
		try {
			await user.save();
		} catch (error) {
			return h.badImplementation(`Couldn't add movie [${imdbID}] to user [${username}]`);
		}
		return movie;
	},
	async delete(request, h) {
		const { username } = request.params;
		let { movieId } = request.params;
		movieId = _.uniq(movieId.split(','));
		const user = await User.findOne({
			username
		});

		movieId.forEach((movieIdToDelete) => {
			user.movies = user.movies.filter((existingMovie) => {
				return String(existingMovie.information) !== movieIdToDelete;
			});
		});
		try {
			const updatedUser = await user.save();
			return updatedUser.movies;
		} catch ({ message }) {
			console.log(message);
			return h.badImplementation(`Couldn't delete movie [${movieId}]`);
		}
	}
};
