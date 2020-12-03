const getDate = require("../../util/getDate");

function errorHandler(res, status, msg, err) {
  const dateMsg = `[${getDate()}] ${msg}`

  console.error(`\n\t${dateMsg}`);
  console.trace();

  if (err) console.error(err);

  res.status(status).json({ message: dateMsg });
}

module.exports = errorHandler;
