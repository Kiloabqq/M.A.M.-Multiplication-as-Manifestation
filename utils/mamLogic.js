function multiply(a, b, mode = 'standard', metadata = {}) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Inputs must be numbers');
  }

  if (mode === 'null') return 0;
  if (mode === 'catalytic') return a + 1;
  if (mode === 'unit_amplify') return a * b + 1;
  if (mode === 'doubling_symmetry') return 2 * a;
  if (mode === 'non_commutative') return a * b + (a !== b ? 1 : 0);

  return a + b;
}

module.exports = { multiply };