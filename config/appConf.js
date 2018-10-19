require('dotenv').config();

module.exports = {
	server: {
		port: process.env.PORT || '3000',
		host: 'localhost'
	},
	secret: process.env.SECRET,
	mongodb: {
		collection: 'lastscene',
		username: process.env.MONGODB_USERNAME,
		password: process.env.MONGODB_PASSWORD,
		host: process.env.MONGODB_HOST,
		port: process.env.MONGODB_PORT
	},
	cloudinary: {
		apiKey: process.env.CLOUDINARY_API_KEY,
		apiSecret: process.env.CLOUDINARY_API_SECRET
	},
	isProduction() {
		return process.env.NODE_ENV === 'production';
	}
};
