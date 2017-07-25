const Trakt = require('trakt.tv');
const apiKeys = require('../config/apiKeys');
// const Movie = require('../classes/movie');

const trakt = new Trakt({
	client_id: apiKeys.trakt.clientID,
	client_secret: apiKeys.trakt.clientSecret,
	redirect_uri: null, // defaults to 'urn:ietf:wg:oauth:2.0:oob'
	api_url: null, // defaults to 'https://api.trakt.tv'
	debug: true
});

const traktService = {
	search: (information) => {
		return new Promise((resolve, reject) => {
			trakt.search.text({
				query: information.title,
				type: 'movie'
			})
			.then((movies) => {
				resolve(movies);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}
};

module.exports = traktService;
