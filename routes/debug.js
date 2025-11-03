const express = require('express');
const router = express.Router();
const { multiply } = require('../utils/mamLogic');

router.post('/', (req, res) => {
  const { a, b, mode, metadata } = req.body;
  console.log('DEBUG payload:', { a, b, mode, metadata });

  try {
    const result = multiply(a, b, mode, metadata);
    res.json({
      input: { a, b, mode, metadata },
      output: result,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('DEBUG error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;