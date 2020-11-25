function successHandler(res, status, message, data) {
  console.log(`\n\t${message}`);

  if (data) {
    res.status(status).json({ data, message });
    return;
  }

  res.status(status).json({ message });
}

module.exports = successHandler;
