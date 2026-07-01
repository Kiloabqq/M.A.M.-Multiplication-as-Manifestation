const express = require("express");

const { interpretHandler } = require("../controllers/mamController");

const router = express.Router();

router.post("/", interpretHandler);

module.exports = router;
