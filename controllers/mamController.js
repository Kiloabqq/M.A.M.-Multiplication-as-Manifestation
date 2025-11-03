function multiply(a, b, mode = 'standard', metadata = {}) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Inputs must be numbers');
  }

  switch (mode) {
    case 'null':
      return 0;
    case 'catalytic':
      return a + 1;
    case 'unit_amplify':
      return a * b + 1;
    case 'doubling_symmetry':
      return 2 * a;
    case 'non_commutative':
      return a * b + (a !== b ? 1 : 0);
    case 'standard':
      return a + b;
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
}

module.exports = { multiply };

