function checkValues(variable, missedValue) {
  if (!variable) {
    console.error(`\n\tGuild ${missedValue} is missing`);
    console.trace();
    return false;
  }

  return true;
}

module.exports = checkValues;
