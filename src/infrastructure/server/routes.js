const express = require('express')
const router = express.Router()

const { createLog } = require('../log')
const { db } = require('../storage/db')
const accountServiceFactory = require('../../webauthn/services/account')
const userRepositoryFactory = require('../../webauthn/repository')

const injectDependencies = (req, _, next) => {
  req.dependencies = {
    accountService: accountServiceFactory({
      Logger: createLog('AccountService'),
      repository: userRepositoryFactory({
        db,
        Logger: createLog('userRepository')
      })
    }),
  }

  next()
}

const {
  createUser
} = require('../../webauthn/controller')

router.post('/user', injectDependencies, createUser);

module.exports = router
