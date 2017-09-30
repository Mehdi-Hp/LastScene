const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const debug = require('debug')('development');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
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
	movies: [{
		imdbID: String,
		state: String,
		points: {
			type: Number,
			default: 5
		},
		note: String
	}]
});

userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = (password, user) => {
	debug('Checking password validation...');
	return bcrypt.compareSync(password, user.authentication.local.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
