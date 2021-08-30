const createUser = async (req, res, next) => {
  const {
    dependencies: {
      accountService
    }
  } = req;
  
  try {
    await accountService.createUser(req, res, next)
    res.status(201)
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  createUser
}
