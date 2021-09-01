const express = require('express');

const router = express.Router();
const {
  csrfCheck,
  sessionCheck,
} = require('./middlewares/validators');
const container = require('./container');

const {
  createUser,
  authUser,
  registerCredentials,
} = require('../../webauthn/controller');

router.post('/user', createUser(container));
router.post('/auth', authUser(container));
router.post(
  '/register-request',
  csrfCheck,
  sessionCheck,
  registerCredentials(container),
);

module.exports = router;
