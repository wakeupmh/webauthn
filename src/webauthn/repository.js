module.exports = ({
  db,
  Logger
}) => {
  const userEntity = db.get('users')

  const findUser = username => {
    try {
      return Promise.resolve(userEntity.find({ username }).value())
    }
    catch (err) {
      Logger.error(err)
      throw err
    }
  }

  const createUser = user => {
    try {
      return Promise.resolve(userEntity.push(user).write())
    }
    catch (err) {
      Logger.error(err)
      throw err
    }
  }

  return {
    findUser,
    createUser
  }
}
