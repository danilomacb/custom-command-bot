const getDate = require("../util/getDate");

function errorHandler(res, status, log, message, err) {
  console.error(`\n[${getDate()}] ${log}`);
  console.trace();

  if (err) console.error(err);

  res.status(status).json({ message });
}

module.exports = errorHandler;
