const getDate = require("./getDate");

function successHandler(res, status, msg, data) {
  const dateMsg = `[${getDate()}] ${msg}`

  console.log(`\n${dateMsg}`);

  if (data) {
    res.status(status).json({ data, message: dateMsg });
    return;
  }

  res.status(status).json({ message: dateMsg });
}

module.exports = successHandler;
