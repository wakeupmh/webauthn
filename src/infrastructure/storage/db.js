const fs = require('fs');
const low = require('lowdb');

if (!fs.existsSync('./.data')) {
  fs.mkdirSync('./.data');
}

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');
const db = low(adapter);

db.defaults({
  users: [],
}).write()


module.exports = { db }
