const router = require('express').Router();
const cloudinary = require('cloudinary').v2;

router.use((req, res, next) => {
	const publicID = req.url.slice(
		req.url.lastIndexOf('/') + 1,
		req.url.lastIndexOf('?')
	);
	const folder = req.originalUrl.includes('poster') ? 'poster' : 'backdrop';
	res.redirect(
		cloudinary.url(`${folder}/${publicID}.jpg`, {
			secure: false,
			quality: req.query.quality || 'auto',
			width: req.query.width || undefined,
			height: req.query.height || undefined,
			crop: req.query.crop || undefined,
			gravity: req.query.gravity || undefined
		})
	);
});

module.exports = router;
