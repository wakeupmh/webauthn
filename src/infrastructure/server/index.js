const application = require('./application');
const middlewares = require('./middlewares');

module.exports = {
  ...application,
  ...middlewares,
};
