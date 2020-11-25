function errorHandler(res, status, message, err) {
  console.error(`\n\t${message}`);
  console.trace();

  if (err) console.error(err);

  res.status(status).json({ message });
}

module.exports = errorHandler;
