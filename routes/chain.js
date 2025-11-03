const express = require('express');
const router = express.Router();
const { multiply } = require('../utils/mamLogic');
const { applyOverlay } = require('../utils/roleOverlay');
const { interpretPrompt } = require('../utils/promptInterpreter');

router.post('/', (req, res) => {
  const { prompt, a = 1, b = 1 } = req.body;
  console.log('CHAIN prompt:', prompt);

  try {
    // Step 1: Interpret prompt → role sequence
    const roles = interpretPrompt(prompt); // e.g. ['catalyst', 'potential']

    // Step 2: Apply overlays in sequence
    let payload = { a, b, mode: 'standard', metadata: { intent: 'chained' } };
    for (const role of roles) {
      payload = applyOverlay(role, payload);
    }

    // Step 3: Run logic
    const result = multiply(payload.a, payload.b, payload.mode, payload.metadata);

    // Step 4: Return full trace
    res.json({
      prompt,
      roles,
      finalPayload: payload,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('CHAIN error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
