const { format } = require('date-fns');

module.exports = function (value) {
  const formatted = format(value, 'd MMM u');
  return formatted;
};
