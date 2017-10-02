const sharp = require('sharp');
const debug = require('debug')('development');

module.exports = (backdropPath, backdropName) => {
	return new Promise((mainResolve, mainReject) => {
		debug('Generating backdrop from original file...');
		const jpegSmall = new Promise((resolve, reject) => {
			sharp(backdropPath)
				.resize(null, 400)
				.jpeg()
				.toFile(`${backdropPath}--small.jpeg`, () => {
					resolve(`${backdropPath}--small.jpeg`);
					debug('Backdrop--small generated.');
				});
		});
		const jpegMedium = new Promise((resolve, reject) => {
			sharp(backdropPath)
				.resize(null, 760)
				.jpeg()
				.toFile(`${backdropPath}--medium.jpeg`, () => {
					resolve(`${backdropPath}--medium.jpeg`);
					debug('Backdrop--medium generated.');
				});
		});
		const jpegBig = new Promise((resolve, reject) => {
			sharp(backdropPath)
				.resize(null, 1080)
				.jpeg()
				.toFile(`${backdropPath}--big.jpeg`, () => {
					resolve(`${backdropPath}--big.jpeg`);
					debug('Backdrop--big generated.');
				});
		});
		Promise.all([jpegSmall, jpegMedium, jpegBig]).then((backdropsPath) => {
			debug(`Backdrops: ${backdropsPath}`);
			mainResolve({
				small: backdropsPath[0],
				medium: backdropsPath[1],
				big: backdropsPath[2]
			});
		});
	});
};
