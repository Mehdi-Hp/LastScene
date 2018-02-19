const chalk = require('chalk');
const debug = require('debug')('development');

module.exports = {
	connect(mongoose) {
		if (process.env.MONGODB_USERNAME) {
			mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/lastscene`, {
				autoReconnect: true
			});
		} else {
			mongoose.connect(`mongodb://@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/lastscene`, {
				autoReconnect: true
			});
		}
		mongoose.Promise = global.Promise;
		const mongooseConnection = mongoose.connection;
		mongooseConnection.on('error', (error) => {
			throw error;
		});
		mongooseConnection.once('connection', () => {
			debug(chalk.bold.cyan(`Connected to MongoDB, ${mongooseConnection.name} collection`));
		});
		mongooseConnection.once('open', () => {
			debug(chalk.bold.cyan(`Connected to MongoDB, ${mongooseConnection.name} collection`));
		});
		mongooseConnection.once('reconnect', () => {
			debug(chalk.bold.cyan(`reConnected to MongoDB, ${mongooseConnection.name} collection`));
		});
	}
};
