const crypto = require('crypto')
const base64url = require('base64url')

module.exports = ({
  Logger,
  repository
}) => {
  const createUser = async (req, _, next) => {
    try {
      const { body: { username } } = req
      let user = await repository.findUser(username)
    
      if (!user) {
        Logger.info(`User ${username} not exists, creating then...`)
        
        user = {
          username,
          id: base64url.encode(crypto.randomBytes(32)),
          credentials: [],
        }
        
        await repository.createUser(user)
      }
    
      req.session.username = username;
    }
    catch(err) {
      Logger.error(`Error creating user - ${err}`)
      next(err)
    }
  }

  return {
    createUser
  }
}
