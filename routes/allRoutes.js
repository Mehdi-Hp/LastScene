const router = require('express').Router();

router.use('/', require('./indexRoute'));
router.use('/api/v1/', require('./apiRoute'));

module.exports = router;
