const sharp = require('sharp');
const debug = require('debug')('development');

module.exports = (posterPath, posterName) => {
	return new Promise((mainResolve, mainReject) => {
		debug('Generating poster from original file...');
		const jpegSmall = new Promise((resolve, reject) => {
			sharp(posterPath)
				.resize(null, 400)
				.jpeg()
				.toFile(`${posterPath}--small.jpeg`, () => {
					resolve(`${posterPath}--small.jpeg`);
					debug('Poster--small generated.');
				});
		});
		const jpegMedium = new Promise((resolve, reject) => {
			sharp(posterPath)
				.resize(null, 760)
				.jpeg()
				.toFile(`${posterPath}--medium.jpeg`, () => {
					resolve(`${posterPath}--medium.jpeg`);
					debug('Poster--medium generated.');
				});
		});
		const jpegBig = new Promise((resolve, reject) => {
			sharp(posterPath)
				.resize(null, 1080)
				.jpeg()
				.toFile(`${posterPath}--big.jpeg`, () => {
					resolve(`${posterPath}--big.jpeg`);
					debug('Poster--big generated.');
				});
		});
		Promise.all([jpegSmall, jpegMedium, jpegBig]).then((postersPath) => {
			debug(`Posters: ${postersPath}`);
			mainResolve({
				small: postersPath[0],
				medium: postersPath[1],
				big: postersPath[2]
			});
		});
	});
};
