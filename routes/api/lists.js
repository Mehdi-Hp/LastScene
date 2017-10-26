const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const _ = require('lodash');
const User = require('../../models/user');
const List = require('../../models/list');
const getMovie = require('../../services/getMovie');
const currentOrCustomUser = require('../../restricts/currentOrCustomUser');

app.route('/')
	.get((req, res, next) => {
		let theUsername;
		if (res.locals.customUser) {
			theUsername = res.locals.customUser;
			debug(chalk.yellow(`Getting ${theUsername}'s lists`));
		} else {
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
		currentOrCustomUser(req, res);
		const listName = req.body.name;
		const imdbID = req.body.movies;
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
					res.status(200).json({
						createdList
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
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqLists = req.body;
		const user = new User(req.user);
		const updateListPromises = [];
		const savedUpdatedLists = [];
		reqLists.forEach((reqList) => {
			debug(chalk.yellow(`Updating list "${reqList.slug}" for ${user.username}`));
			updateListPromises.push(
				new Promise((resolve, reject) => {
					List.findBySlug(reqList.slug).then((currentList) => {
						if (!currentList || currentList.status === 400) {
							reject({
								status: 404,
								message: `Couldn't find the list [${reqList.name}] to update`
							});
						}
						const listToPut = new List(_.merge(currentList, _.omit(reqList, ['createdAt', 'modifiedAt', '_id', 'followers', '__v'])));
						listToPut.save().then((updatedList) => {
							debug(chalk.green(`List [${reqList.slug}] updated`));
							savedUpdatedLists.push(updatedList);
							return resolve(updatedList);
						}).catch((error) => {
							debug(chalk.bold.red(error));
							return reject({
								status: 500,
								message: `Couldn't save the list [${reqList.name}], because of database error`
							});
						});
					}).catch((error) => {
						debug(chalk.bold.red(error));
						res.status(500).json({
							message: `Couldn't find list [${reqList.slug}], because of database error`
						});
					});
				})
			);
		});
		Promise.all(updateListPromises).then((updatedLists) => {
			res.status(200).json(savedUpdatedLists);
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.delete((req, res, next) => {
		currentOrCustomUser(req, res);
		const listSlugs = req.body;
		const user = new User(req.user);
		const deleteListPromises = [];
		const savedDeletedLists = [];
		listSlugs.forEach((listSlug) => {
			debug(chalk.yellow(`Deleting list "${listSlug}" that belongs ${user.username}`));
			deleteListPromises.push(
				new Promise((resolve, reject) => {
					List.findBySlug(listSlug).then((currentList) => {
						if (!currentList || currentList.status === 400) {
							reject({
								status: 404,
								message: `Couldn't find the list [${listSlug.name}] to update`
							});
						}
						currentList.remove().then((deletedList) => {
							debug(chalk.green(`List [${listSlug.slug}] got deleted`));
							savedDeletedLists.push(deletedList);
							resolve(deletedList);
						}).catch((error) => {
							debug(chalk.bold.red(error));
							reject({
								status: 500,
								message: `Couldn't delete the list [${listSlug.name}], because of database error`
							});
						});
					}).catch((error) => {
						debug(chalk.bold.red(error));
						res.status(500).json({
							message: `Couldn't find list [${listSlug}], because of database error`
						});
					});
				})
			);
		});
		Promise.all(deleteListPromises).then((deletedLists) => {
			res.status(200).json(savedDeletedLists);
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(error.status).json({
				message: error.message
			});
		});
	});

app.route('/:listSlug')
	.get((req, res, next) => {
		const listSlug = req.params.listSlug;
		List.findBySlug(listSlug).then((list) => {
			if (!list) {
				return res.status(404).json({
					message: `Couldn't find list [${listSlug}]`
				});
			}
			res.json(list);
		}).catch((error) => {
			debug(chalk.bold.red(error));
			return res.status(500).json({
				message: 'Couldn\'t get list, because of database error'
			});
		});
	})
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqList = req.body;
		const user = new User(req.user);
		const currentListSlug = req.params.listSlug;
		debug(chalk.yellow(`Updating list "${reqList.slug}" for ${user.username}`));
		List.findBySlug(currentListSlug).then((currentList) => {
			if (!currentList || currentList.status === 400) {
				res.status(404).json({
					message: `Couldn't find the list [${reqList.name}] to update`
				});
			}
			const listToPut = new List(_.merge(currentList, _.omit(reqList, ['createdAt', 'modifiedAt', '_id', 'followers', '__v'])));
			listToPut.save().then((updatedList) => {
				debug(chalk.green(`List [${reqList.slug}] updated`));
				res.status(200).json(updatedList);
			}).catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					message: `Couldn't save the list [${reqList.name}], because of database error`
				});
			});
		});
	})
	.delete((req, res, next) => {
		currentOrCustomUser(req, res);
		const listSlug = req.params.listSlug;
		const user = new User(req.user);
		debug(chalk.yellow(`Deleting list [${listSlug}] that belongs to [${user.username}]`));
		List.findBySlug(listSlug).then((foundedList) => {
			if (!foundedList || foundedList.status === 400) {
				res.status(404).json({
					message: `Couldn't find list [${listSlug}]`
				});
			}
			if (_.find(user.lists, { slug: listSlug })) {
				res.status(403).json({
					message: `List [${listSlug}] doesn't belong to [${user.username}]`
				});
			}
			foundedList.remove().then((deletedList) => {
				debug(chalk.yellow(`List [${listSlug}] got deleted`));
				res.status(200).json({
					gotDeleted: true,
					deletedList
				});
			}).catch((error) => {
				debug(chalk.bold.red(error));
				res.status(500).json({
					message: `Couldn't delete list [${listSlug}], because of database error`
				});
			});
		}).catch((error) => {
			debug(chalk.bold.red(error));
			res.status(500).json({
				message: `Couldn't find list [${listSlug}], because of database error`
			});
		});
	});

module.exports = app;
