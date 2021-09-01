const createUser = ({ accountService }) => async (req, res, next) => {
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

const authUser = ({ accountService }) => async (req, res, next) => {
  try {
    const username = await accountService.authUser(req, res, next);

    req.session = {
      username,
      'signed-in': true,
    };

    return res.status(200).json(req.body.user);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const generateRegistration = ({ accountService }) => async (req, res, next) => {
  try {
    const options = await accountService.generateRegistration(req, res, next);

    return res.status(200).json(options);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const verifyRegistration = ({ accountService }) => async (req, res, next) => {
  try {
    const options = await accountService.verifyRegistration(req, res, next);

    return res.status(200).json(options);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

module.exports = {
  createUser,
  authUser,
  generateRegistration,
  verifyRegistration,
};
