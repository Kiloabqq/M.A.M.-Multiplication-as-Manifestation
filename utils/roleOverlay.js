function applyOverlay(role, payload) {
  switch (role) {
    case 'catalyst':
      return { ...payload, a: payload.a + 1, metadata: { ...payload.metadata, role: 'catalyst' } };
    case 'potential':
      return { ...payload, b: payload.b * 2, metadata: { ...payload.metadata, role: 'potential' } };
    case 'null':
      return { ...payload, a: 0, b: 0, metadata: { ...payload.metadata, role: 'null' } };
    default:
      return { ...payload, metadata: { ...payload.metadata, role: 'standard' } };
  }
}

module.exports = { applyOverlay };
