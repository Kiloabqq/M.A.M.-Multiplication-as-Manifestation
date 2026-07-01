const { multiply, VALID_MODES } = require("../utils/mamLogic");
const { applyOverlay } = require("../utils/roleOverlay");
const {
  interpretPrompt,
  SUPPORTED_MODE_KEYWORDS,
  SUPPORTED_ROLE_KEYWORDS,
} = require("../utils/promptInterpreter");

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function normalizeMetadata(metadata) {
  if (metadata === undefined) {
    return {};
  }

  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw badRequest("metadata must be an object when provided.");
  }

  return metadata;
}

function normalizeRole(role) {
  if (typeof role !== "string" || role.trim() === "") {
    return "standard";
  }

  return role.trim().toLowerCase();
}

function normalizeMode(mode) {
  if (mode === undefined) {
    return "standard";
  }

  if (typeof mode !== "string" || !VALID_MODES.includes(mode)) {
    throw badRequest(
      `Unknown mode: ${mode}. Supported modes: ${VALID_MODES.join(", ")}.`,
    );
  }

  return mode;
}

function parseNumber(value, name) {
  if (
    typeof value !== "number" ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    throw badRequest(`${name} must be a finite number.`);
  }

  return value;
}

function parsePrompt(prompt) {
  if (typeof prompt !== "string" || prompt.trim() === "") {
    throw badRequest("prompt is required and must be a non-empty string.");
  }

  return prompt.trim();
}

function buildNumericPayload(body = {}) {
  return {
    a: parseNumber(body.a, "a"),
    b: parseNumber(body.b, "b"),
    mode: normalizeMode(body.mode),
    metadata: normalizeMetadata(body.metadata),
    role: normalizeRole(body.role),
  };
}

function createBasePayload({ a, b, mode, metadata }) {
  return {
    a,
    b,
    mode,
    metadata: { ...metadata },
    agentTrace: [],
  };
}

function sendError(res, error) {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error." : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({ error: message });
}

function multiplyHandler(req, res) {
  try {
    const { a, b, mode, metadata, role } = buildNumericPayload(req.body);
    const adjusted = applyOverlay(
      role,
      createBasePayload({ a, b, mode, metadata }),
    );
    const result = multiply(
      adjusted.a,
      adjusted.b,
      adjusted.mode,
      adjusted.metadata,
    );

    res.status(200).json({
      operator: "symbolic_composition",
      mode: adjusted.mode,
      role,
      result,
      metadata: adjusted.metadata,
      agentTrace: adjusted.agentTrace,
    });
  } catch (error) {
    sendError(res, error);
  }
}

function debugHandler(req, res) {
  try {
    const { a, b, mode, metadata, role } = buildNumericPayload(req.body);
    const adjusted = applyOverlay(
      role,
      createBasePayload({ a, b, mode, metadata }),
    );
    const result = multiply(
      adjusted.a,
      adjusted.b,
      adjusted.mode,
      adjusted.metadata,
    );

    res.status(200).json({
      operator: "symbolic_composition",
      input: { a, b, mode, metadata, role },
      adjusted,
      result,
      supportedModes: VALID_MODES,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    sendError(res, error);
  }
}

function interpretHandler(req, res) {
  try {
    const prompt = parsePrompt(req.body && req.body.prompt);
    const interpretation = interpretPrompt(prompt);

    res.status(200).json({
      prompt,
      ...interpretation,
      supportedKeywords: {
        roles: SUPPORTED_ROLE_KEYWORDS,
        modes: SUPPORTED_MODE_KEYWORDS,
      },
    });
  } catch (error) {
    sendError(res, error);
  }
}

function chainHandler(req, res) {
  try {
    const prompt = parsePrompt(req.body && req.body.prompt);
    const a = parseNumber(req.body && req.body.a, "a");
    const b = parseNumber(req.body && req.body.b, "b");
    const metadata = normalizeMetadata(req.body && req.body.metadata);
    const interpretation = interpretPrompt(prompt);

    let payload = createBasePayload({
      a,
      b,
      mode: interpretation.mode,
      metadata: {
        ...metadata,
        intent: "chain",
        prompt,
      },
    });

    for (const role of interpretation.roles) {
      payload = applyOverlay(role, payload);
    }

    const result = multiply(
      payload.a,
      payload.b,
      payload.mode,
      payload.metadata,
    );

    res.status(200).json({
      operator: "symbolic_composition",
      prompt,
      roles: interpretation.roles,
      mode: interpretation.mode,
      agentTrace: payload.agentTrace,
      finalPayload: payload,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    sendError(res, error);
  }
}

module.exports = {
  chainHandler,
  debugHandler,
  interpretHandler,
  multiplyHandler,
};
