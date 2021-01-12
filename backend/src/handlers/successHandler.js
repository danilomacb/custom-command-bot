const getDate = require("../util/getDate");

function successHandler(res, status, log, message, data) {
  console.log(`\n[${getDate()}] ${log}`);

  if (data) {
    res.status(status).json({ data, message });
    return;
  }

  res.status(status).json({ message });
}

module.exports = successHandler;
