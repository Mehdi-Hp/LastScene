const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const debug = require('debug')('development');
const _ = require('lodash');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	username: String,
	authentication: {
		local: {
			email: String,
			password: String
		},
		google: {
			id: String,
			token: String,
			email: String
		}
	},
	created: {
		type: Date,
		default: Date.now
	},
	movies: [new Schema({
		imdbID: {
			type: String,
			required: true
		},
		state: String,
		rate: {
			type: Number,
			default: null
		},
		note: String
	}, { _id: false })]
});

userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = (password, user) => {
	debug('Checking password validation...');
	return bcrypt.compareSync(password, user.authentication.local.password);
};

userSchema.methods.isValidPassword = (password, user) => {
	debug('Checking password validation...');
	return bcrypt.compareSync(password, user.authentication.local.password);
};

userSchema.methods.findByIdAndAddMovie = (user, imdbID) => {
	debug(`Adding movie ${imdbID} to ${user.username}'s movies...`);
	return new Promise((resolve, reject) => {
		user.model('User').findById(user._id, (error, foundedUser) => {
			if (error) {
				return reject({
					status: 500,
					message: 'Database error'
				});
			}
			if (_.findKey(foundedUser.movies, { imdbID })) {
				debug(`User "${foundedUser.name}" already added this movie: "${imdbID}"`);
				return reject({
					status: 400,
					message: `You already added this movie: "${imdbID}"`
				});
			}
			user.model('User').findByIdAndUpdate(user._id, {
				$push: {
					movies: {
						imdbID
					}
				}
			}, {
				new: true
			}, (error, updatedUser) => {
				if (error) {
					reject({
						status: 500,
						message: 'Database error'
					});
				}
				debug(`Movie "${imdbID}" added to user "${user.name}"`);
				resolve(updatedUser);
			});
		});
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
