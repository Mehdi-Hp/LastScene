const userController = require('../controllers/userController');
const movieController = require('../controllers/movieController');
const { isAuthorized, checkUserExistance } = require('../services/auth');
const movieSchemas = require('./schemas/movies');
const userSchemas = require('./schemas/user');

module.exports = {
	name: 'App User Routes',
	version: '0.0.0',
	async register(server, options) {
		server.route([
			{
				method: 'GET',
				path: '/users/{username}',
				handler: userController.getOne,
				options: {
					validate: {
						query: {
							username: userSchemas.username()
						}
					},
					pre: [
						{
							method: checkUserExistance
						}
					]
				}
			},
			{
				method: 'GET',
				path: '/users/{username}/movies',
				handler: movieController.getAll,
				options: {
					validate: {
						query: {
							username: userSchemas.username()
						}
					}
				}
			},
			{
				method: 'POST',
				path: '/users/{username}/movies',
				handler: movieController.add,
				options: {
					validate: {
						query: {
							username: userSchemas.username()
						},
						payload: {
							imdbID: movieSchemas.imdbId().required()
						}
					},
					pre: [
						{
							method: isAuthorized
						},
						{
							method: checkUserExistance
						}
					]
				}
			},
			{
				method: 'GET',
				path: '/users/{username}/movies/{movieId}',
				handler: movieController.getOne,
				options: {
					validate: {
						query: {
							username: userSchemas.username(),
							movieId: movieSchemas.movieId()
						}
					},
					pre: [
						{
							method: checkUserExistance
						}
					]
				}
			},
			{
				method: 'PATCH',
				path: '/users/{username}/movies/{movieId}',
				handler: movieController.update,
				options: {
					validate: {
						query: {
							username: userSchemas.username(),
							movieId: movieSchemas.movieId()
						},
						payload: {
							watched: movieSchemas.watched(),
							watchList: movieSchemas.watchList(),
							favourite: movieSchemas.favourite(),
							note: movieSchemas.note()
						}
					},
					pre: [
						{
							method: isAuthorized
						},
						{
							method: checkUserExistance
						}
					]
				}
			},
			{
				method: 'DELETE',
				path: '/users/{username}/movies/{movieId}',
				handler: movieController.delete,
				options: {
					validate: {
						query: {
							username: userSchemas.username(),
							movieId: movieSchemas.movieId()
						}
					},
					pre: [
						{
							method: isAuthorized
						},
						{
							method: checkUserExistance
						}
					]
				}
			}
		]);
	}
};
