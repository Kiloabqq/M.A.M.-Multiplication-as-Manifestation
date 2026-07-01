const express = require("express");

const { debugHandler } = require("../controllers/mamController");

const router = express.Router();

router.post("/", debugHandler);

module.exports = router;
