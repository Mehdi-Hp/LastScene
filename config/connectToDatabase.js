const chalk = require('chalk');
const debug = require('debug')('development');

module.exports = (mongoose) => {
	mongoose.connect('mongodb://mehdi:5BB4nlLLGXS4EYFWNhSR6CumGAOfgqb16@ds237748.mlab.com:37748/lastscene', {
		autoReconnect: true
	});
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
};
