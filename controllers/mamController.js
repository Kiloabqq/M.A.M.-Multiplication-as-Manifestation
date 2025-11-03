const { multiply } = require('../utils/mamLogic');
const { applyOverlay } = require('../utils/roleOverlay');

/**
 * Handles POST requests to /mam/multiply
 * Applies role-based overlays, invokes logic engine, and returns result
 */
function multiplyHandler(req, res) {
  const { a, b, mode, metadata = {}, role = 'standard' } = req.body;
  console.log('MULTIPLY payload:', { a, b, mode, metadata, role });

  try {
    // Apply role-based overlay
    const adjusted = applyOverlay(role, { a, b, mode, metadata });

    // Run logic engine
    const result = multiply(adjusted.a, adjusted.b, adjusted.mode, adjusted.metadata);

    // Return result with role attribution
    res.status(200).json({
      result,
      role: adjusted.metadata.role,
      metadata: adjusted.metadata
    });
  } catch (err) {
    console.error('MULTIPLY error:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Handles POST requests to /mam/debug
 * Returns full trace of input, output, and timestamp
 */
function debugHandler(req, res) {
  const { a, b, mode, metadata = {}, role = 'standard' } = req.body;
  console.log('DEBUG payload:', { a, b, mode, metadata, role });

  try {
    const adjusted = applyOverlay(role, { a, b, mode, metadata });
    const result = multiply(adjusted.a, adjusted.b, adjusted.mode, adjusted.metadata);

    res.status(200).json({
      input: { a, b, mode, metadata, role },
      adjusted,
      output: result,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('DEBUG error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  multiplyHandler,
  debugHandler
};
