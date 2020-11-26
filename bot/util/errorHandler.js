function errorHandler(err) {
  if (err.response.data.message) {
    console.error(err.response.data.message);
    console.trace();
    return;
  }

  console.error(err);
  console.trace();
}

module.exports = errorHandler;
