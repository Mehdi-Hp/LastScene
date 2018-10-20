const path = require('path');

module.exports = {
	name: 'App Home Routes',
	version: '0.0.0',
	async register(server, options) {
		server.route([
			{
				method: 'GET',
				path: '/fonts/{filename}',
				options: {
					auth: false
				},
				handler: {
					file: function(request) {
						return `fonts/${request.params.filename}`;
					}
				}
			},
			{
				method: 'GET',
				path: '/{filename}',
				options: {
					auth: false
				},
				handler: function(request, h) {
					debugger;
					var path = request.params.filename;
					var match = path.match(/\./);
					if (match) {
						var filename = match[2];
						return h.file(request.params.filename);
					}
					return h.continue;
				}
			},
			{
				method: 'GET',
				path: '/{path*}',
				options: {
					auth: false
				},
				handler: {
					file: {
						path: 'index.html',
						confine: false
					}
				}
			}
		]);
	}
};
