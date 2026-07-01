const VALID_MODES = [
  "standard",
  "catalytic",
  "unit_amplify",
  "doubling_symmetry",
  "non_commutative",
  "null",
];

function assertFiniteNumber(value, name) {
  if (
    typeof value !== "number" ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    const error = new Error(`${name} must be a finite number.`);
    error.statusCode = 400;
    throw error;
  }
}

function assertKnownMode(mode) {
  if (!VALID_MODES.includes(mode)) {
    const error = new Error(
      `Unknown mode: ${mode}. Supported modes: ${VALID_MODES.join(", ")}.`,
    );
    error.statusCode = 400;
    throw error;
  }
}

function unitAmplify(a, b) {
  if (a === 1) {
    return b + 1;
  }

  if (b === 1) {
    return a + 1;
  }

  return a + b + 1;
}

function doublingSymmetry(a, b) {
  if (a === b) {
    return 2 * a;
  }

  return a + b;
}

function nonCommutativeCompose(a, b) {
  return 2 * a + b;
}

function multiply(a, b, mode = "standard", metadata = {}) {
  void metadata;

  assertFiniteNumber(a, "a");
  assertFiniteNumber(b, "b");
  assertKnownMode(mode);

  switch (mode) {
    case "null":
      return 0;
    case "catalytic":
      return a + b + 1;
    case "unit_amplify":
      return unitAmplify(a, b);
    case "doubling_symmetry":
      return doublingSymmetry(a, b);
    case "non_commutative":
      return nonCommutativeCompose(a, b);
    case "standard":
    default:
      return a + b;
  }
}

module.exports = {
  multiply,
  VALID_MODES,
};
