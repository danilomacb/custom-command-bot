const errorHandler = require("./errorHandler");

function checkBody(res, variable, missedValue) {
  if (!variable) {
    errorHandler(
      res,
      500,
      `Error on creating new discord server, the ${missedValue} is missing`,
      "Error on creating new discord server"
    );
    return false;
  }

  return true;
}

module.exports = checkBody;
