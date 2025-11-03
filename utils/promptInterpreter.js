function interpretPrompt(prompt) {
  const lower = prompt.toLowerCase();
  const roles = [];

  if (lower.includes('catalyst')) roles.push('catalyst');
  if (lower.includes('potential')) roles.push('potential');
  if (lower.includes('nullify')) roles.push('null');
  if (roles.length === 0) roles.push('standard');

  return roles;
}

module.exports = { interpretPrompt };
