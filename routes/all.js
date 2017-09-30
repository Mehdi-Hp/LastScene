const router = require('express').Router();
const isAuthorized = require('../restricts/isAuthorized');

router.use('/authenticate', require('./authenticate'));
router.use('/api/v1', isAuthorized, require('./api'));

module.exports = router;
