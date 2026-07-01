const SUPPORTED_ROLE_KEYWORDS = {
  catalyst: ["catalyst", "ignite", "spark"],
  potential: ["potential", "latent", "capacity"],
  null: ["null", "nullify", "zero out"],
  observer: ["observe", "observer", "inspect"],
  filter: ["filter", "screen", "guard"],
  amplifier: ["amplify", "amplifier", "boost"],
};

const SUPPORTED_MODE_KEYWORDS = {
  non_commutative: ["non-commutative", "non commutative", "order matters"],
  doubling_symmetry: ["double", "doubling", "symmetry"],
  unit_amplify: ["unit", "identity", "unit amplify"],
  null: ["null mode", "collapse", "zero"],
  catalytic: ["catalytic", "catalyst mode", "activate"],
};

function normalizePrompt(prompt) {
  if (typeof prompt !== "string") {
    return "";
  }

  return prompt.trim().toLowerCase();
}

function findMatches(text, keywords) {
  return keywords.filter((keyword) => text.includes(keyword));
}

function interpretPrompt(prompt) {
  const normalizedPrompt = normalizePrompt(prompt);
  const matchedRoles = {};
  const roles = [];

  for (const [role, keywords] of Object.entries(SUPPORTED_ROLE_KEYWORDS)) {
    const matches = findMatches(normalizedPrompt, keywords);
    if (matches.length > 0) {
      roles.push(role);
      matchedRoles[role] = matches;
    }
  }

  const orderedModes = [
    "non_commutative",
    "doubling_symmetry",
    "unit_amplify",
    "null",
    "catalytic",
  ];

  let mode = "standard";
  let matchedModeKeywords = [];

  for (const candidate of orderedModes) {
    const matches = findMatches(
      normalizedPrompt,
      SUPPORTED_MODE_KEYWORDS[candidate],
    );
    if (matches.length > 0) {
      mode = candidate;
      matchedModeKeywords = matches;
      break;
    }
  }

  return {
    roles: roles.length > 0 ? roles : ["standard"],
    mode,
    matchedKeywords: {
      roles: matchedRoles,
      mode: matchedModeKeywords,
    },
  };
}

module.exports = {
  interpretPrompt,
  SUPPORTED_MODE_KEYWORDS,
  SUPPORTED_ROLE_KEYWORDS,
};
