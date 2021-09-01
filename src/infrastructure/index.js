const log = require('./log');
const server = require('./server');
const db = require('./storage/db');

module.exports = {
  ...server,
  ...log,
  ...db,
};
