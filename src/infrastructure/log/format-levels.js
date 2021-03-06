/* istanbul ignore file */
const { format } = require('winston');

const {
  splat,
  printf,
  combine,
  timestamp,
  colorize,
} = format;

const colors = () => colorize({
  all: true,
  colors: Object.freeze({
    trace: 'green',
    info: 'blue',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  }),
});

const upperCaseLevel = format((info) => {
  // eslint-disable-next-line no-param-reassign
  info.level = info.level.toUpperCase();
  return info;
});

const customFormat = () => printf(({
  // eslint-disable-next-line no-shadow
  level, message, timestamp, projectLabel,
}) => `[${timestamp}] ${level} - [${projectLabel}]: ${message}`);

const combineLogFormats = (...formats) => combine(
  upperCaseLevel(),
  timestamp(),
  splat(),
  customFormat(),
  colors(),
  ...formats,
);

module.exports = {
  combineLogFormats,
};
