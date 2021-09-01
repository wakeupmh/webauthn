const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const router = require('./routes');

const {
  errorHandler,
  notFoundHandler,
} = require('./middlewares');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/webauthn', router);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = { app };
