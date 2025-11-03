function interpretPrompt(prompt) {
  const lower = prompt.toLowerCase();
  const roles = [];
  let mode = 'standard';

  if (lower.includes('catalyst')) roles.push('catalyst');
  if (lower.includes('potential')) roles.push('potential');
  if (lower.includes('nullify')) roles.push('null');
  if (lower.includes('observe')) roles.push('observer');
  if (lower.includes('filter')) roles.push('filter');
  if (lower.includes('amplify')) roles.push('amplifier');

  if (lower.includes('double')) mode = 'doubling_symmetry';
  if (lower.includes('non-commutative')) mode = 'non_commutative';
  if (lower.includes('unit')) mode = 'unit_amplify';
  if (lower.includes('null')) mode = 'null';
  if (lower.includes('catalyst')) mode = 'catalytic';

  if (roles.length === 0) roles.push('standard');

  return { roles, mode };
}

module.exports = { interpretPrompt };
