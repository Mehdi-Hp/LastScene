const cloudinary = require('cloudinary');
const {
	cloudinary: { apiKey, apiSecret }
} = require('../config/appConf');

module.exports = {
	init() {
		cloudinary.config({
			cloud_name: 'lastscene',
			api_key: apiKey,
			api_secret: apiSecret
		});
	}
};
