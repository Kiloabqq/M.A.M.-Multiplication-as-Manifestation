function applyOverlay(role, payload) {
  const trace = payload.agentTrace || [];
  let updated = { ...payload };

  switch (role) {
    case 'catalyst': updated.a += 1; break;
    case 'potential': updated.b *= 2; break;
    case 'null': updated.a = 0; updated.b = 0; break;
    case 'observer': updated.metadata.observed = true; break;
    case 'filter':
      if (updated.a < 0 || updated.b < 0) throw new Error('Filtered: negative input');
      break;
    case 'amplifier': updated.a *= 10; updated.b *= 10; break;
    default: break;
  }

  updated.metadata = { ...updated.metadata, role };
  updated.agentTrace = [...trace, {
    role,
    result: { a: updated.a, b: updated.b }
  }];

  return updated;
}

module.exports = { applyOverlay };
