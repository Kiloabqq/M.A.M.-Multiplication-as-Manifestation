function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map(cloneValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        cloneValue(nestedValue),
      ]),
    );
  }

  return value;
}

function createSnapshot(payload) {
  return {
    a: payload.a,
    b: payload.b,
    mode: payload.mode,
    metadata: cloneValue(payload.metadata),
  };
}

function updateMetadata(payload, role, extraMetadata = {}) {
  const appliedRoles = Array.isArray(payload.metadata.appliedRoles)
    ? [...payload.metadata.appliedRoles, role]
    : [role];

  payload.metadata = {
    ...payload.metadata,
    ...extraMetadata,
    lastRole: role,
    appliedRoles,
  };
}

function applyOverlay(role, payload) {
  const nextPayload = {
    a: payload.a,
    b: payload.b,
    mode: payload.mode || "standard",
    metadata: cloneValue(payload.metadata || {}),
    agentTrace: Array.isArray(payload.agentTrace)
      ? payload.agentTrace.map(cloneValue)
      : [],
  };

  const before = createSnapshot(nextPayload);
  let reason = "Standard role preserves the payload and records a trace entry.";

  switch (role) {
    case "catalyst":
      nextPayload.a += 1;
      reason =
        "Catalyst increases the initiating operand to represent intent injection.";
      updateMetadata(nextPayload, role);
      break;
    case "potential":
      nextPayload.b *= 2;
      reason =
        "Potential expands the second operand to represent latent capacity.";
      updateMetadata(nextPayload, role);
      break;
    case "null":
      nextPayload.a = 0;
      nextPayload.b = 0;
      nextPayload.mode = "null";
      reason = "Null collapses the composition path and forces a zero result.";
      updateMetadata(nextPayload, role, { nullified: true });
      break;
    case "observer":
      reason = "Observer annotates the payload without changing numeric state.";
      updateMetadata(nextPayload, role, { observed: true });
      break;
    case "filter":
      if (nextPayload.a < 0 || nextPayload.b < 0) {
        const error = new Error("Filtered: negative input is not allowed.");
        error.statusCode = 400;
        throw error;
      }

      reason = "Filter validates the operands before composition continues.";
      updateMetadata(nextPayload, role, { filtered: true });
      break;
    case "amplifier":
      nextPayload.a *= 2;
      nextPayload.b *= 2;
      reason = "Amplifier increases both operands before symbolic composition.";
      updateMetadata(nextPayload, role, { amplified: true });
      break;
    case "standard":
    default:
      updateMetadata(nextPayload, role);
      break;
  }

  const after = createSnapshot(nextPayload);
  nextPayload.agentTrace.push({
    role,
    before,
    after,
    reason,
  });

  return nextPayload;
}

module.exports = { applyOverlay };
