const fs = require('fs');

module.exports = function (req, res) {
  const content = fs.readFileSync('dist/404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write(content);
  res.end();
};
