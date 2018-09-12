module.exports = {
	name: 'App Routes',
	version: '0.0.0',
	async register(server, options) {
		server.register([
			{
				plugin: require('./usersRoute'),
				routes: {
					prefix: '/api'
				}
			},
			{
				plugin: require('./authRoute')
			}
		]);
	}
};
