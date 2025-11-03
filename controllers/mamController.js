const { multiply } = require('../utils/mamLogic');
const { applyOverlay } = require('../utils/roleOverlay');
const { interpretPrompt } = require('../utils/promptInterpreter');

function multiplyHandler(req, res) {
  const { a, b, mode, metadata = {}, role = 'standard' } = req.body;
  console.log('MULTIPLY payload:', { a, b, mode, metadata, role });

  try {
    const adjusted = applyOverlay(role, { a, b, mode, metadata });
    const result = multiply(adjusted.a, adjusted.b, adjusted.mode, adjusted.metadata);
    res.status(200).json({ result, role: adjusted.metadata.role, metadata: adjusted.metadata });
  } catch (err) {
    console.error('MULTIPLY error:', err);
    res.status(500).json({ error: err.message });
  }
}

function debugHandler(req, res) {
  const { a, b, mode, metadata = {}, role = 'standard' } = req.body;
  console.log('DEBUG payload:', { a, b, mode, metadata, role });

  try {
    const adjusted = applyOverlay(role, { a, b, mode, metadata });
    const result = multiply(adjusted.a, adjusted.b, adjusted.mode, adjusted.metadata);
    res.status(200).json({
      input: { a, b, mode, metadata, role },
      adjusted,
      agentTrace: adjusted.agentTrace,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('DEBUG error:', err);
    res.status(500).json({ error: err.message });
  }
}

function chainHandler(req, res) {
  const { prompt, a = 1, b = 1 } = req.body;
  console.log('CHAIN prompt:', prompt);

  try {
    const { roles, mode } = interpretPrompt(prompt);
    let payload = { a, b, mode, metadata: { intent: 'chained' }, agentTrace: [] };

    for (const role of roles) {
      payload = applyOverlay(role, payload);
    }

    const result = multiply(payload.a, payload.b, payload.mode, payload.metadata);
    res.status(200).json({
      prompt,
      roles,
      mode,
      agentTrace: payload.agentTrace,
      finalPayload: payload,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('CHAIN error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  multiplyHandler,
  debugHandler,
  chainHandler
};
