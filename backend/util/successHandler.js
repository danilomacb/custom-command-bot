const getDate = require("./getDate");

function successHandler(res, status, log, message, data) {
  const dateLog = `[${getDate()}] ${log}`

  console.log(`\n${dateLog}`);

  if (data) {
    res.status(status).json({ data, message });
    return;
  }

  res.status(status).json({ message });
}

module.exports = successHandler;
