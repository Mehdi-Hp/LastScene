const cloudinary = require('cloudinary').v2;

module.exports = {
	name: 'App Files Routes',
	version: '0.0.0',
	async register(server, options) {
		server.route([
			{
				method: 'GET',
				path: '/poster/{imdbId}',
				handler(request, h) {
					return h.redirect(
						cloudinary.url(`poster/${request.params.imdbId}.jpg`, {
							secure: false,
							quality: 'auto',
							width: 250
						})
					);
				},
				options: {
					auth: false
				}
			}
		]);
	}
};
