const fs = require('fs');

module.exports =
  (source) => fs.existsSync(source) ? fs.readFileSync(source) : source;
