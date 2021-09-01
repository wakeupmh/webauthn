const createUser = (container) => async (req, res, next) => {
  const {
    accountService,
  } = container;

  try {
    const username = await accountService.createUser(req, res, next);

    req.session = {
      username,
    };

    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};

const authUser = (container) => async (req, res, next) => {
  const {
    accountService,
  } = container;

  try {
    const username = await accountService.authUser(req, res, next);

    req.session = {
      username,
      'signed-in': true,
    };

    return res.sendStatus(200).json(req.body.user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  authUser,
};
