const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const User = require('../../models/user');
const List = require('../../models/list');
const getMovie = require('../../services/getMovie');

app.route('/')
	.get((req, res, next) => {
		let theUsername;
		if (res.locals.customUser) {
			theUsername = res.locals.customUser;
			debug(chalk.yellow(`Getting ${theUsername}'s lists`));
		} else {
			debug(req.user);
			theUsername = req.user.username;
			debug(chalk.yellow(`Getting user lists: "${theUsername}"`));
		}
		User.findOne({ username: theUsername }).then((user) => {
			if (!user.lists) {
				return res.json({
					user: theUsername,
					data: null
				});
			}
			const lists = user.lists.map((list) => {
				return list._id;
			});
			List.find(
				{
					_id: {
						$in: lists
					}
				}
			).then((lists) => {
				debug(chalk.green(`${theUsername} has ${lists.length} list[s]`));
				res.json({
					user: theUsername,
					data: lists
				});
			}).catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					error: true,
					message: 'Could not get lists.'
				});
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(400).json({
				error: true,
				message: 'Could not find user.'
			});
		});
	})
	.post((req, res, next) => {
		const listName = req.body.name;
		const imdbID = req.body.imdbID;
		const user = new User(req.user);
		getMovie(imdbID);
		debug(chalk.yellow(`Adding ${imdbID} to ${listName}...`));
		const list = new List({
			name: listName,
			owner: user._id
		});
		imdbID.forEach((theImdbID) => {
			list.movies.push({
				imdbID: theImdbID
			});
		});
		List.create(list)
			.then((createdList) => {
				user.findOneAndAddList(user, {
					_id: createdList._id,
					name: createdList.name
				}).then((updatedUser) => {
					res.json({
						updatedUser
					});
				}).catch((error) => {
					debug(chalk.bold.red(`ERROR adding list: ${error.message}`));
					res.status(error.status).json({
						error: true,
						message: error.message
					});
				});
			})
			.catch((error) => {
				debug(chalk.bold.red(`ERROR adding list: ${error.message}`));
				res.status(error.status).json({
					error: true,
					message: 'Database error'
				});
			});
	})
	.patch((req, res, next) => {

	});

module.exports = app;
