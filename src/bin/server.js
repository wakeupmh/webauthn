const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const { apiConfig } = require('../config');
const { createLog, app } = require('../infrastructure');

const server = http.createServer(app);
const Logger = createLog('bootstrap');

const onSignal = () => {
  Logger.info('server is starting cleanup');
  return Promise.resolve();
};

const onShutdown = () => {
  Logger.info('cleanup finished, server is shutting down');
};

const onHealthCheck = () => Promise.resolve('UP');

const terminusConfiguration = Object.freeze({
  logger: Logger.info,
  signal: 'SIGINT',
  healthChecks: {
    '/healthcheck': onHealthCheck,
  },
  onSignal,
  onShutdown,
});

createTerminus(server, terminusConfiguration);

server.listen(apiConfig.port, (err) => {
  if (err) {
    Logger.error(err);
    return;
  }
  Logger.info(`Magic happens on port ${apiConfig.port} ✨`);
});
