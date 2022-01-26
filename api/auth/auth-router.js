const bcrypt = require('bcryptjs')
const makeToken = require('./auth-token-builder')
const router = require('express').Router()
const User = require('../users/users-model.js')

const { BCRYPT_ROUNDS } = require('../../config')

router.post('/register', (req, res, next) => {
  let user = req.body

  // bcrypting the password before saving
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  // never save the plain text password in the db
  user.password = hash

  User.add(user)
    .then(saved => {
      res.status(201).json({ message: `Great to have you, ${saved.username}` })
    })
    .catch(next) // our custom err handling middleware in server.js will trap this
})
// TEST:   http :9000/api/auth/login username=foo password=1234
router.post('/login', (req, res, next) => {
  let { username, password } = req.body

  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
         // here we make token and send it to client in res.body
         const token = makeToken(user)
        res.status(200).json({ message: `Welcome back ${user.username}...` , token})
      } else {
        next({ status: 401, message: 'Invalid Credentials' })
      }
    })
    .catch(next)
})

module.exports = router
