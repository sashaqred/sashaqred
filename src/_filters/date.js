const { format } = require('date-fns');

module.exports = function (value, dateFormat = 'd MMM u') {
  const formatted = format(value, dateFormat);
  return formatted;
};
