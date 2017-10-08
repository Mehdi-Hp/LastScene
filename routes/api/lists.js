const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const User = require('../../models/user');
const List = require('../../models/list');

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
		debug(req.body);
	})
	.patch((req, res, next) => {

	});

module.exports = app;
