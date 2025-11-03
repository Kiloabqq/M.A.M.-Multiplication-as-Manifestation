const { multiply } = require('../utils/mamLogic');
const { applyOverlay } = require('../utils/roleOverlay');
const { interpretPrompt } = require('../utils/promptInterpreter');

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

module.exports = { chainHandler };
