module.exports = {
	name: 'App Routes',
	version: '0.0.0',
	async register(server, options) {
		server.register([
			{
				plugin: require('./users'),
				routes: {
					prefix: '/api'
				}
			},
			{
				plugin: require('./auth')
			}
		]);
	}
};
