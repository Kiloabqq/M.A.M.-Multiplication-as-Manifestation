const express = require('express');
const router = express.Router();
const { multiplyHandler } = require('../controllers/mamController');

router.post('/', multiplyHandler);

module.exports = router;