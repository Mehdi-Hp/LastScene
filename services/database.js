const mongoose = require('mongoose');
const chalk = require('chalk');
const debug = require('debug')('app:database');
const {
	mongodb: { username, password, host, port, collection }
} = require('../config/appConf');

module.exports = {
	connect() {
		if (process.env.MONGODB_USERNAME) {
			mongoose.connect(
				`mongodb://${username}:${password}@${host}:${port}/${collection}`,
				{
					autoReconnect: true,
					useNewUrlParser: true
				}
			);
		} else {
			mongoose.connect(
				`mongodb://@${host}:${port}/${collection}`,
				{
					autoReconnect: true,
					useNewUrlParser: true
				}
			);
		}
		mongoose.Promise = global.Promise;
		const mongooseConnection = mongoose.connection;
		mongooseConnection.on('error', (error) => {
			throw error;
		});
		mongooseConnection.once('connection', () => {
			debug(chalk.bold.underline.cyan(`Connected to MongoDB, ${mongooseConnection.name} collection`));
		});
		mongooseConnection.once('open', () => {
			debug(chalk.bold.underline.cyan(`Connected to MongoDB, ${mongooseConnection.name} collection`));
		});
		mongooseConnection.once('reconnect', () => {
			debug(chalk.bold.underline.cyan(`reconnected to MongoDB, ${mongooseConnection.name} collection`));
		});
		return mongooseConnection;
	}
};
