const app = require('express')();
const debug = require('debug')('development');
const chalk = require('chalk');
const User = require('../../models/user');
const List = require('../../models/list');
const mergeForPut = require('../../services/mergeForPut');
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
		if (!req.body.name) {
			res.status(403).json({
				message: 'You should provide the name field'
			});
		}
		const listName = req.body.name;
		const movieIDs = req.body.movies || [];
		const user = new User(req.user);
		debug(chalk.yellow(`Adding ${movieIDs} to ${listName}...`));
		const list = new List({
			name: listName,
			owner: user._id
		});
		getMovie(movieIDs);
		movieIDs.forEach((movieID) => {
			list.movies.push({
				_id: movieID
			});
		});
		List.create(list).then((createdList) => {
			user.findOneAndAddList(user, {
				_id: createdList._id,
				name: createdList.name
			}).then((updatedUser) => {
				res.status(200).json({
					createdList
				});
			}).catch((error) => {
				res.status(error.status).json({
					message: error.message
				});
			});
		}).catch((error) => {
			res.status(error.status).json({
				message: error.message
			});
		});
	})
	.put((req, res, next) => {
		currentOrCustomUser(req, res);
		const reqLists = req.body;
		const updateListPromises = [];
		const user = new User(req.user);
		reqLists.forEach((reqList) => {
			debug(chalk.yellow(`Updating list "${reqList.slug}" for ${user.username}`));
			if (reqList.movies && reqList.movies.length) {
				const movieIDs = reqList.movies;
				getMovie(movieIDs);
				reqList.movies = reqList.movies.map((movie) => {
					return {
						_id: movie
					};
				});
			}
			updateListPromises.push(
				new Promise((resolve, reject) => {
					List.findBySlug(reqList.slug).then((existedList) => {
						if (!existedList || existedList.status === 400) {
							res.status(404).json({
								message: `Couldn't find the list [${reqList.slug}] to update`
							});
						}
						if (existedList.owner === user._id) {
							const listToPut = new List(mergeForPut(existedList, reqList));
							listToPut.owner = user._id;
							debug(listToPut);
							listToPut.save().then((updatedList) => {
								debug(chalk.green(`List [${reqList.slug}] got updated`));
								return resolve(updatedList);
							}).catch((error) => {
								debug(chalk.bold.red(error));
								return reject({
									status: 500,
									message: `Couldn't update the list [${reqList.slug}], because of database error`
								});
							});
						} else {
							return reject({
								status: 403,
								message: `The list [${reqList.slug}] doesn't belong to you.`
							});
						}
					});
				})
			);
		});
		Promise.all(updateListPromises).then((updatedLists) => {
			res.status(200).json(updatedLists);
		}).catch((error) => {
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
		const rawReqList = req.body;
		const reqList = rawReqList;
		const user = new User(req.user);
		reqList.slug = req.params.listSlug;
		if (rawReqList.movies && rawReqList.movies.length) {
			const movieIDs = rawReqList.movies;
			getMovie(movieIDs);
			reqList.movies = rawReqList.movies.map((movie) => {
				return {
					_id: movie
				};
			});
		}
		debug(chalk.yellow(`Updating list "${reqList.slug}" for ${user.username}`));
		List.findBySlug(req.params.listSlug).then((existedList) => {
			if (!existedList || existedList.status === 400) {
				res.status(404).json({
					message: `Couldn't find the list [${reqList.slug}] to update`
				});
			}
			if (existedList.owner === user._id) {
				const listToPut = new List(mergeForPut(existedList, reqList));
				listToPut.owner = user._id;
				listToPut.save().then((updatedList) => {
					debug(chalk.green(`List [${reqList.slug}] got updated`));
					res.status(200).json(updatedList);
				}).catch((error) => {
					debug(chalk.bold.red(error));
					res.status(500).json({
						message: `Couldn't update the list [${reqList.slug}], because of database error`
					});
				});
			} else {
				res.status(403).json({
					message: `The list [${reqList.slug}] doesn't belong to you.`
				});
			}
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
			foundedList.remove().then((deletedList) => {
				debug(chalk.yellow(`List [${listSlug}] got deleted`));
				user.findOneAndDeleteList(user, foundedList).then((updatedUser) => {
					res.status(200).json({
						deleted: true,
						deletedList
					});
				}).catch((error) => {
					res.status(error.status).json({
						message: error.message
					});
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
