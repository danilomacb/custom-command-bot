function getDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

module.exports = getDate;
