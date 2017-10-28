const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const debug = require('debug')('development');
const chalk = require('chalk');
const shortid = require('shortid');
const _ = require('lodash');
const List = require('../models/list');
const Movie = require('../models/movie');

const Schema = mongoose.Schema;

const moviesSubSchema = new Schema({
	_id: {
		type: String,
		ref: Movie
	},
	state: String,
	rate: Number,
	note: String
}, {
	_id: false,
	timestamps: true
});

const listsSubSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate,
		ref: List
	}
});

const userSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	name: String,
	username: String,
	authentication: {
		local: {
			email: String,
			password: String,
			writable: false
		},
		google: {
			id: String,
			token: String,
			email: String,
			writable: false
		}
	},
	movies: [moviesSubSchema],
	lists: [listsSubSchema]
}, {
	timestamps: true
});

userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = (password, user) => {
	debug('Checking password validation...');
	return bcrypt.compareSync(password, user.authentication.local.password);
};

userSchema.methods.findOneAndAddMovie = (user, imdbIDs) => {
	const addMoviePromises = [];
	imdbIDs.forEach((imdbID) => {
		debug(chalk.yellow(`Adding movie [${imdbID}] to [${user.username}]'s movies...`));
		addMoviePromises.push(
			new Promise((resolve, reject) => {
				user.model('User').findById(user._id).then((foundedUser) => {
					if (!foundedUser || foundedUser.status === 400) {
						return reject({
							status: 403,
							message: `User [${user.name}] doesn't exists`
						});
					}
					if (_.find(foundedUser.movies, { _id: imdbID })) {
						debug(chalk.green(`User [${foundedUser.name}] already added this movie: [${imdbID}]`));
						return resolve({
							message: `You have been already added movie [${imdbID}]`
						});
					}
					foundedUser.model('User').findByIdAndUpdate(foundedUser._id, {
						$push: {
							movies: {
								_id: imdbID
							}
						}
					}, {
						new: true
					}).then((updatedUser) => {
						debug(chalk.green(`Movie [${imdbID}] added to user [${foundedUser.name}]`));
						resolve(_.find(updatedUser.movies, { _id: imdbID }));
					}).catch((error) => {
						debug(chalk.bold.red(error));
						return reject({
							status: 500,
							message: `Couldn't add movie [${imdbID}] to user [${foundedUser.name}], because of database error`
						});
					});
				}).catch((error) => {
					debug(chalk.bold.red(error));
					return reject({
						status: 500,
						message: `Couldn't find the user [${user.name}] to update, because of database error`
					});
				});
			})
		);
	});
	return addMoviePromises;
};

userSchema.methods.findOneAndUpdateMovie = (user, movies) => {
	const updateMoviePromises = [];
	const User = user.model('User');
	movies.forEach((reqMovie) => {
		debug(chalk.yellow(`Updating movie [${reqMovie.imdbID}] for [${user.username}]...`));
		updateMoviePromises.push(
			new Promise((resolve, reject) => {
				User.findById(user.id).then((foundedUser) => {
					if (!foundedUser || foundedUser.status === 400) {
						return reject({
							status: 404,
							message: `Couldn't find the user [${user.name}] to update`
						});
					}
					const existedMovie = _.find(foundedUser.movies, {
						_id: reqMovie.imdbID
					});
					if (!existedMovie) {
						return reject({
							status: 404,
							message: `Movie [${reqMovie.imdbID}] doesn't belong to user [${user.name}]`
						});
					}
					const movieToPut = _.merge(existedMovie, reqMovie);
					movieToPut.updatedAt = Date.now();
					User.findOneAndUpdate({
						_id: user._id,
						'movies._id': reqMovie.imdbID
					}, {
						'movies.$': movieToPut
					}, {
						new: true
					}).then((updatedUser) => {
						if (!updatedUser) {
							return reject({
								status: 500,
								message: `Couldn't update the user [${user.name}], because of server error`
							});
						}
						debug(chalk.green(`Movie [${reqMovie.imdbID}] updated for [${user.username}]...`));
						return resolve(_.find(updatedUser.movies, { _id: reqMovie.imdbID }));
					}).catch((error) => {
						debug(chalk.bold.red(error));
						return reject({
							status: 500,
							message: `Couldn't update the user [${user.name}]`
						});
					});
				}).catch((error) => {
					debug(chalk.bold.red(error));
					return reject({
						status: 500,
						message: `Couldn't find the user [${user.name}] because of database error`
					});
				});
			})
		);
	});
	return updateMoviePromises;
};

userSchema.methods.findOneAndDeleteMovie = (user, imdbIDs) => {
	const deleteMoviePromises = [];
	imdbIDs.forEach((imdbID) => {
		debug(chalk.yellow(`Deleting movie [${imdbID}] from [${user.username}]'s movies...`));
		deleteMoviePromises.push(
			new Promise((resolve, reject) => {
				user.model('User').findById(user._id).then((foundedUser) => {
					if (!foundedUser || foundedUser.status === 400) {
						return reject({
							status: 403,
							message: `User [${user.name}] doesn't exists`
						});
					}
					if (!_.findKey(foundedUser.movies, { _id: imdbID })) {
						debug(chalk.green(`User [${user.name}] doesn't have this movie: [${imdbID}]`));
						return resolve({
							status: 404,
							message: `movie [${imdbID}] doesn't exist or has been already deleted`
						});
					}
					user.model('User').findByIdAndUpdate(foundedUser._id, {
						$pull: {
							movies: {
								_id: imdbID
							}
						}
					}, {
						new: true
					}).then((updatedUser) => {
						debug(chalk.green(`Movie [${imdbID}] deleted from user [${foundedUser.name}]'s movies'`));
						resolve(_.find(foundedUser.movies, { _id: imdbID }));
					}).catch((error) => {
						debug(chalk.bold.red(error));
						reject({
							status: 500,
							message: `Couldn't delete movie [${imdbID}] from user [${foundedUser.name}], because of database error`
						});
					});
				}).catch((error) => {
					debug(chalk.bold.red(error));
					return reject({
						status: 500,
						message: `Couldn't find the user [${user.name}] to update because of database error`
					});
				});
			})
		);
	});
	return deleteMoviePromises;
};

userSchema.methods.findOneAndAddList = (user, list) => {
	debug(chalk.yellow(`Adding list [${list.name}] to [${user.username}]`));
	return new Promise((resolve, reject) => {
		user.model('User').findById(user._id).then((foundedUser) => {
			debug(foundedUser);
			if (!foundedUser) {
				return reject({
					status: 404,
					message: `User [${user.username}] doesn't exist`
				});
			}
			if (_.findKey(user.lists, { name: list.name })) {
				debug(`User [${user.name}] already added list [${list.name}]`);
				return reject({
					status: 403,
					message: `You already added this list: [${list.name}]`
				});
			}
			user.model('User').findByIdAndUpdate(user._id, {
				$push: {
					lists: {
						_id: list._id
					}
				}
			}, {
				new: true
			}).then((updatedUser) => {
				debug(chalk.green(`List [${list.name}] added to user [${user.username}]`));
				resolve(updatedUser);
			}).catch((error) => {
				debug(chalk.bold.red(error));
				reject({
					status: 500,
					message: `Couldn't add list [${list.name}] to user [${user.username}]`
				});
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			return reject({
				status: 500,
				message: 'Database error'
			});
		});
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
