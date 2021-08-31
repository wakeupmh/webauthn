const { createLog } = require('../log')
const { db } = require('../storage/db')
const accountServiceFactory = require('../../webauthn/services/account')
const userRepositoryFactory = require('../../webauthn/repository')

module.exports = {
  accountService: accountServiceFactory({
    Logger: createLog('AccountService'),
    repository: userRepositoryFactory({
      db,
      Logger: createLog('userRepository')
    })
  })
}
