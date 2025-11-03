const express = require('express');
const router = express.Router();
const { chainHandler } = require('../controllers/mamController');

router.post('/', chainHandler);

module.exports = router;
