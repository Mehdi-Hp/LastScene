const chalk = require('chalk');
const debug = require('debug')('development');
const keys = require('../config/keys');

module.exports = {
	connect(mongoose) {
		console.log(process.env.omdb);
		if (process.env.NODE_ENV === 'production') {
			mongoose.connect(`mongodb://${keys.mongodb.username}:${keys.mongodb.password}@ds237748.mlab.com:37748/lastscene`, {
				autoReconnect: true
			});
		} else {
			mongoose.connect('mongodb://localhost:27017/lastscene', {
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
