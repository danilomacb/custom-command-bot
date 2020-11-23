function checkValues(variable, missedValue) {
  if (!variable) {
    console.error(`Guild ${missedValue} is missing`);
    return false;
  }

  return true;
}

module.exports = checkValues;
