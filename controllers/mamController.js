const { multiply } = require('../utils/mamLogic');

function multiplyHandler(req, res) {
  const { a, b, mode, metadata } = req.body;
  console.log('Incoming payload:', { a, b, mode, metadata });

  try {
    const result = multiply(a, b, mode, metadata);
    res.json({ result });
  } catch (err) {
    console.error('Error in multiplyHandler:', err);
    res.status(500).json({ error: err.message });
  }
}


module.exports = { multiplyHandler };
