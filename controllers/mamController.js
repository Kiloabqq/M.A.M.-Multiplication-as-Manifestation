const { multiply } = require('../utils/mamLogic');

/**
 * Handles POST requests to /mam/multiply
 * Validates input, invokes logic engine, and returns result
 */
function multiplyHandler(req, res) {
  const { a, b, mode, metadata } = req.body;

  console.log('Incoming payload:', { a, b, mode, metadata });

  try {
    // Validate inputs
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Inputs "a" and "b" must be numbers');
    }

    // Call logic engine
    const result = multiply(a, b, mode, metadata);

    // Return result
    res.status(200).json({ result });
  } catch (err) {
    console.error('Error in multiplyHandler:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { multiplyHandler };

