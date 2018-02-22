const router = require('express').Router();
const isAuthorized = require('../restricts/isAuthorized');

router.use('/authenticate', require('./authenticate'));
router.use('/api/v1', isAuthorized, require('./api'));
router.use('/files', require('./handleFiles'));

router.use('/', (req, res, next) => {
	res.render('index');
});

module.exports = router;
