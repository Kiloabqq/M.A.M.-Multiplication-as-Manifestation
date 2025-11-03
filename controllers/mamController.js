const { multiply } = require('../utils/mamLogic');

function multiplyHandler(req, res) {
  const { a, b, mode, metadata } = req.body;
  try {
    const result = multiply(a, b, mode, metadata);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { multiplyHandler };