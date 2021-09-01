const errorHandler = require('./errorHandler');
const validators = require('./validators');

module.exports = {
  ...errorHandler,
  ...validators,
};
