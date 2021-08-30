const sessionCheck = (req, res, next) => {
  if (!req.session['signed-in']) {
    return res.status(401).json({ error: 'not signed in.' });
  }
  next()
}

const csrfCheck = (req, res, next) => {
  if (req.header('X-Requested-With') != 'XMLHttpRequest') {
    return res.status(400).json({ error: 'invalid access.' })
  }
  next()
}

module.exports = {
  csrfCheck,
  sessionCheck
}
