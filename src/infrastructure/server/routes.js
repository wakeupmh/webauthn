const express = require('express')
const router = express.Router()

router.get('/alo', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
});

module.exports = router
