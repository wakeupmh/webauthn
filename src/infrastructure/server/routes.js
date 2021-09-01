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
  generateRegistration,
  verifyRegistration,
} = require('../../webauthn/controller');

router.post('/user', createUser(container));
router.post('/auth', authUser(container));
router.post(
  '/register-request',
  csrfCheck,
  sessionCheck,
  generateRegistration(container),
);
router.post(
  '/register-request',
  csrfCheck,
  sessionCheck,
  verifyRegistration(container),
);

module.exports = router;
