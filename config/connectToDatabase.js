const chalk = require('chalk');
const debug = require('debug')('development');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (mongoose) => {
	mongoose.connect('mongodb://localhost:27017/pixr', {
		server: {
			socketOptions: {
				keepAlive: 300000,
				connectTimeoutMS: 30000
			}
		},
		replset: {
			socketOptions: {
				keepAlive: 300000,
				connectTimeoutMS: 30000
			}
		},
		autoReconnect: true
	});
	mongoose.Promise = Promise;
	const mongooseConnection = mongoose.connection;
	mongooseConnection.on('error', (error) => {
		throw error;
	});
	mongooseConnection.once('connection', () => {
		if (isDevelopment) {
			debug(chalk.bold.cyan(`Connected to MongoDB, ${mongooseConnection.name} collection`));
		}
	});
	mongooseConnection.once('open', () => {
		if (isDevelopment) {
			debug(chalk.bold.cyan(`Connected to MongoDB, ${mongooseConnection.name} collection`));
		}
	});
	mongooseConnection.once('reconnect', () => {
		if (isDevelopment) {
			debug(chalk.bold.cyan(`reConnected to MongoDB, ${mongooseConnection.name} collection`));
		}
	});
};
