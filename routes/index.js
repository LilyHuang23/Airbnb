const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/airbnb', require('./airbnb'));

module.exports = router;