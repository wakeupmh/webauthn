module.exports = ({
  db,
  Logger,
}) => {
  const userEntity = db.get('users');

  const findUser = (username) => {
    try {
      return Promise.resolve(userEntity.find({ username }).value());
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  const createUser = (user) => {
    try {
      return Promise.resolve(userEntity.push(user).write());
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  const updateCurrentChallenge = (username, challenge) => {
    try {
      const user = findUser(username);
      user.currentChallenge = challenge;

      userEntity.find({ username }).assign(user).write();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  return {
    findUser,
    createUser,
    updateCurrentChallenge,
  };
};
