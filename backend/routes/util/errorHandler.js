function errorHandler(res, status, consoleMsg, errorMsg, err) {
  console.error(consoleMsg);

  if (err) console.error(err);

  res.status(status).json({ message: errorMsg });
}

module.exports = errorHandler;
