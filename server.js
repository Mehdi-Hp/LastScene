const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('app:server');

require('./services/database').connect();
require('./services/cloudinary').init();

const initAuth = require('./services/auth');

const {
	server: { port, host }
} = require('./config/appConf');

const server = new Hapi.Server({
	port,
	host,
	debug: {
		request: ['error']
	},
	routes: {
		files: {
			relativeTo: path.join(__dirname, 'public', 'production')
		}
	}
});

const start = async () => {
	try {
		await server.register(Inert);

		await server.register([
			{
				plugin: require('hapi-dev-errors'),
				options: {
					showErrors: true
				}
			},
			{
				plugin: require('hapi-boom-decorators')
			},
			{
				plugin: require('hapi-auth-jwt2')
			},
			{
				plugin: require('./routes/index.js')
			}
		]);
		await initAuth(server);
		await server.start();
		debug(chalk.bold.underline.cyan(`Server running at: ${server.info.uri}`));
	} catch (error) {
		debug(chalk.bold.underline.cyan(`Error starting server: ${error}`));
		process.exit(1);
	}
};

start();
