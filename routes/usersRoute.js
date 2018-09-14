const userController = require('../controllers/userController');
const movieController = require('../controllers/movieController');
const { isAuthorized, checkUserExistance } = require('../services/auth');

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
				handler: movieController.getAll
			},
			{
				method: 'POST',
				path: '/users/{username}/movies',
				handler: movieController.add,
				options: {
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
