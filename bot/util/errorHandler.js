function errorHandler(err) {
  if (err.response.data.message) {
    console.error(`\n\t${err.response.data.message}`);
    console.trace();
    return;
  }

  console.error(err);
  console.trace();
}

module.exports = errorHandler;
