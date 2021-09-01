const express = require('express');

const router = express.Router();
const container = require('./container');

const {
  createUser,
} = require('../../webauthn/controller');

router.post('/user', createUser(container));

module.exports = router;
