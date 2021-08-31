const createUser = container => async (req, res, next) => {
  const {
    accountService
  } = container
  
  try {
    const username = await accountService.createUser(req, res, next)

    req.session = {
      username
    }

    return res.sendStatus(201)
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  createUser
}
